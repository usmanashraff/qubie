'use client'

import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { File, Loader2, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/lib/uploadthing'
import { toast } from "sonner"
import cuid from 'cuid'
import { cn } from '@/lib/utils'

const UploadDialog = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])

  const { startUpload } = useUploadThing(isSubscribed ? 'proPlanUploader' : 'freePlanUploader')
  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      console.log("✅ File linked with filegroup:", file)
    },
    retry: true,
    retryDelay: 500,
  })

  const startSimulatedProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 500)
    return interval
  }

  const handleDrop = async (files: File[]) => {
    setIsUploading(true)
    setAcceptedFiles(files)

    const progressInterval = startSimulatedProgress()
    const fileGroupId = cuid()
    const res = await startUpload(files)

    if (!res || res.length === 0) {
      clearInterval(progressInterval)
      setIsUploading(false)
      return toast.error("cannot upload this file", {
        description: 'File type not supported or file too large',
      })
    }

    for (const fileResponse of res) {
      const key = fileResponse?.key
      if (key) startPolling({ key, fileGroupId })
    }

    clearInterval(progressInterval)
    setUploadProgress(100)
    router.push(`/dashboard/${fileGroupId}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 dark:from-indigo-600 dark:to-teal-500 dark:hover:from-indigo-500 dark:hover:to-teal-400 text-primary-foreground rounded-full shadow-lg shadow-primary/20 dark:shadow-indigo-500/20 hover:shadow-primary/40 dark:hover:shadow-indigo-500/40 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload Document
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-background dark:bg-slate-900 border-border dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-space-grotesk text-foreground dark:text-white">Upload Document</DialogTitle>
        </DialogHeader>

        <Dropzone
          multiple
          onDrop={handleDrop}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={cn(
                "mt-4 border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out cursor-pointer",
                isDragging
                  ? "border-primary dark:border-indigo-500 bg-primary/5 dark:bg-indigo-500/10"
                  : "border-border hover:border-muted-foreground dark:border-slate-700 dark:hover:border-slate-600"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center text-center">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                  "bg-gradient-to-br from-primary/20 to-teal-500/20 dark:from-indigo-500/20 dark:to-teal-500/20",
                  isDragging && "animate-pulse"
                )}>
                  <Upload className={cn(
                    "h-8 w-8", 
                    isDragging 
                      ? "text-primary dark:text-indigo-400" 
                      : "text-muted-foreground dark:text-slate-400"
                  )} />
                </div>

                <h3 className="text-lg font-medium text-foreground dark:text-white mb-2">
                  {isDragging ? "Drop your file here" : "Upload your document"}
                </h3>
                <p className="text-muted-foreground dark:text-slate-400 text-sm mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <div className="text-sm text-muted-foreground dark:text-slate-500">
                  Supported formats: PDF, DOCX, TXT, CSV, XLSX, PPTX
                </div>
              </div>
            </div>
          )}
        </Dropzone>

        {acceptedFiles.length > 0 && (
          <div className="mt-4 grid gap-2">
            {acceptedFiles.map((file, i) => (
              <div key={i} className="bg-muted/50 dark:bg-slate-800/50 px-3 py-2 rounded flex items-center gap-2 text-foreground dark:text-white">
                <File className="h-4 w-4 text-primary dark:text-blue-400" />
                <span className="truncate text-sm">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        {isUploading && (
          <div className="mt-4">
            <Progress
              value={uploadProgress}
              className="h-1 bg-muted dark:bg-zinc-700"
              style={{ backgroundColor: uploadProgress === 100 ? '#22c55e' : undefined }}
            />
            {uploadProgress === 100 && (
              <div className="flex gap-1 items-center justify-center text-sm text-muted-foreground dark:text-slate-300 pt-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Redirecting...
              </div>
            )}
          </div>
        )}

        <div className="mt-6 bg-muted/50 dark:bg-slate-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">Tips for best results:</h4>
          <ul className="text-sm text-muted-foreground dark:text-slate-400 space-y-1">
            <li>• Files should be under {isSubscribed ? "32" : "4"}MB</li>
            <li>• Text should be clear and legible</li>
            <li>• Scanned documents should be high quality</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
