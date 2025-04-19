import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getPineconClient } from "@/lib/pinecone";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { PineconeStore } from "@langchain/pinecone";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user || !user.id) throw new Error("Unauthorized");

  const subscriptionPlan = await getUserSubscriptionPlan();

  return {
    subscriptionPlan,
    userId: user.id,
  };
};


// onUploadComplete is called for each file individually
const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    ufsUrl: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: { key: file.key },
  });

  // Avoid reprocessing same file
  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: file.ufsUrl,
      uploadStatus: "PROCESSING",
    },
  });

  try {
    const response = await fetch(file.ufsUrl);
    const blob = await response.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    const pagesAmt = pageLevelDocs.length;
    const { isSubscribed } = metadata.subscriptionPlan;

    const maxPages = isSubscribed
      ? PLANS.find((p) => p.name === "Pro")!.pagesPerPdf
      : PLANS.find((p) => p.name === "Free")!.pagesPerPdf;

    // Exceed check
    if (pagesAmt > maxPages) {
      await db.file.update({
        where: { id: createdFile.id },
        data: { uploadStatus: "FAILED" },
      });
      return;
    }

    // Vectorize and store in Pinecone
    const pinecone = await getPineconClient();
    const pineconeIndex = pinecone.Index("qubie");

    const embeddings = new VertexAIEmbeddings({
      model: "textembedding-gecko@latest",
    });

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: createdFile.id,
    });

    await db.file.update({
      where: { id: createdFile.id },
      data: { uploadStatus: "SUCCESS" },
    });

    console.log("✅ PDF embeddings completed:", file.name);
  } catch (err) {
    console.error("❌ Error processing PDF:", err);
    await db.file.update({
      where: { id: createdFile.id },
      data: { uploadStatus: "FAILED" },
    });
  }
};

// Define routers (same logic, different file sizes)
export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),

  proPlanUploader: f({ pdf: { maxFileSize: "32MB", maxFileCount: 10 } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
