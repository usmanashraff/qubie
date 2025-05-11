import ChatWrapper from '@/components/chat/ChatWrapper'
import PdfRenderer from '@/components/PdfRenderer'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

const MAX_RETRIES = 10 // 10 seconds total (1s * 10)
const RETRY_DELAY = 1000 // 1 second

async function checkFileGroupExists(fileid: string, userId: string, retries = 0) {
  const fileGroup = await db.fileGroup.findFirst({
    where: {
      id: fileid,
      userId,
    },
  })

  if (!fileGroup && retries < MAX_RETRIES) {
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
    return checkFileGroupExists(fileid, userId, retries + 1)
  }

  return fileGroup
}

const Page = async ({ params }: PageProps) => {
  const { fileid } = await params
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`)

  // Check for file group with retries
  const fileGroup = await checkFileGroupExists(fileid, user.id)

  if (!fileGroup) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-blue-500" />
          <p className="text-sm text-muted-foreground dark:text-gray-500">Waiting for files to be processed...</p>
        </div>
      </div>
    )
  }

  // Update upload status
  await db.fileGroup.update({
    where: { id: fileGroup.id },
    data: { uploadStatus: 'SUCCESS' },
  })

  const files = await db.file.findMany({
    where: {
      fileGroupId: fileGroup.id,
      userId: user.id,
    },
  })
   console.log('Files:', files)
  // const files_urls = files.map(file => file.url)
  return (
    <div className='mt-[4rem] flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-muted to-background dark:from-slate-800 dark:to-slate-950'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            <Suspense fallback={
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-blue-500" />
              </div>
            }>
              <PdfRenderer files={files} />
            </Suspense>
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] lg:w-96 lg:border-l lg:border-border dark:border-slate-700/50'>
          <ChatWrapper groupId={fileGroup.id} />
        </div>
      </div>
    </div>
  )
}

export default Page


interface PageProps {
  params: Promise<{ fileid: string }>;
}