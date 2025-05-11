import { NextRequest, NextResponse } from 'next/server';
import { bucket } from '@/lib/google-cloud-storage';
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getPineconClient } from "@/lib/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";
import WordExtractor from "word-extractor";
import { parseOfficeAsync } from 'officeparser';

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const fileGroupId = formData.get('fileGroupId') as string;

    if (!files?.length || !fileGroupId) {
      return NextResponse.json(
        { error: 'No files or fileGroupId provided' },
        { status: 400 }
      );
    }

    // Create or get FileGroup first
    let fileGroup = await db.fileGroup.findUnique({
      where: { id: fileGroupId },
    });

    if (!fileGroup) {
      fileGroup = await db.fileGroup.create({
        data: {
          id: fileGroupId,
          userId: user.id,
          uploadStatus: "PENDING",
          name: new Date().toISOString(), // Default name as timestamp
        },
      });
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const fileName = `${fileGroupId}/${file.name}`;
        const blob = bucket.file(fileName);
        
        await blob.save(Buffer.from(buffer), {
          contentType: file.type,
          metadata: {
            fileGroupId,
            originalName: file.name,
          },
        });

        const fileInfo = {
          key: fileName,
          name: file.name,
          url: `https://storage.googleapis.com/qubie/${fileName}`,
        };

        // Check if file exists in DB
        const isFileExist = await db.file.findFirst({
          where: { key: fileName },
        });

        if (!isFileExist) {
          // Create new file record
          const createdFile = await db.file.create({
            data: {
              key: fileName,
              name: file.name,
              userId: user.id,
              url: fileInfo.url,
              uploadStatus: "PROCESSING",
              fileGroupId: fileGroupId, // Now this will work because FileGroup exists
            },
          });

          try {
            // Process file based on type
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            let pageLevelDocs;

            if (fileExtension === 'pdf') {
              const loader = new PDFLoader(file);
              pageLevelDocs = await loader.load();
            } 
            else if (['docx', 'doc'].includes(fileExtension!)) {
              let rawText: string;

              if (fileExtension === 'docx') {
                const loader = new DocxLoader(file);
                const docs = await loader.load();
                rawText = docs.map(doc => doc.pageContent).join('\n');
              } else {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const extractor = new WordExtractor();
                const extracted = await extractor.extract(buffer);
                rawText = extracted.getBody() || '';
              }

              const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
              });
              
              pageLevelDocs = await textSplitter.splitDocuments([
                new Document({ pageContent: rawText }),
              ]);
            }
            else if (['pptx', 'ppt'].includes(fileExtension!)) {
              const arrayBuffer = await file.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const rawText = await parseOfficeAsync(buffer);

              const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
              });

              pageLevelDocs = await textSplitter.splitDocuments([
                new Document({ 
                  pageContent: rawText,
                  metadata: { source: file.name }
                }),
              ]);
            }
            else if (['xlsx', 'xls'].includes(fileExtension!)) {
              const arrayBuffer = await file.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const rawText = await parseOfficeAsync(buffer);

              const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
              });

              pageLevelDocs = await textSplitter.splitDocuments([
                new Document({ 
                  pageContent: rawText,
                  metadata: { source: file.name }
                }),
              ]);
            }
            else if (fileExtension === 'txt') {
              const rawText = await file.text();
              
              const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
              });

              pageLevelDocs = await textSplitter.splitDocuments([
                new Document({ 
                  pageContent: rawText,
                  metadata: { 
                    source: file.name,
                    fileType: 'text'
                  }
                }),
              ]);
            }
            else if (fileExtension === 'csv') {
              const rawText = await file.text();
              const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
                separators: ['\n']
              });
            
              pageLevelDocs = await textSplitter.splitDocuments([
                new Document({ 
                  pageContent: rawText,
                  metadata: { 
                    source: file.name,
                    fileType: 'csv'
                  }
                }),
              ]);
            }
            else {
              throw new Error('Unsupported file type. Supported formats: PDF, Word, PowerPoint, Excel, TXT, CSV');
            }

            // Store embeddings in Pinecone
            const pinecone = await getPineconClient();
            const pineconeIndex = pinecone.Index("qubie");
            const embeddings = new GoogleGenerativeAIEmbeddings({
              model: "text-embedding-004",
              taskType: TaskType.RETRIEVAL_DOCUMENT,
              title: file.name,
            });

            await PineconeStore.fromDocuments(pageLevelDocs!, embeddings, {
              pineconeIndex,
              namespace: createdFile.id,
            });

            // Update file status to success
            await db.file.update({
              where: { id: createdFile.id },
              data: { uploadStatus: "SUCCESS" },
            });

            console.log("✅ embeddings completed for:", file.name);
          } catch (err) {
            console.error("❌ Error processing document:", err);
            await db.file.update({
              where: { id: createdFile.id },
              data: { uploadStatus: "FAILED" },
            });
          }
        }

        return fileInfo;
      })
    );

    // Update FileGroup status to SUCCESS after all files are processed
    await db.fileGroup.update({
      where: { id: fileGroupId },
      data: { uploadStatus: "SUCCESS" },
    });

    console.log('All files uploaded:', uploadedFiles);
    return NextResponse.json({ files: uploadedFiles });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading files' },
      { status: 500 }
    );
  }
}