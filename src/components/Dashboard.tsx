"use client"

import React, { useState, useEffect } from "react"
import { FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "@/lib/motion"
import { toast } from 'sonner'

import { trpc } from '@/app/_trpc/client'
import {
  Loader2,
  Trash,
  Pencil, // Import Pencil icon
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import UploadButton from './UploadButton'
import { getUserSubscriptionPlan } from '@/lib/stripe'

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

export default function DashboardPage({ subscriptionPlan }: PageProps) {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const utils = trpc.useContext()

  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  // Generate AI names for conversations when component mounts
  useEffect(() => {
    const generateNames = async () => {
      if (!files?.length) return
      
      const conversationsNeedingNames = files.filter(file => 
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(file.name)
      )

      if (conversationsNeedingNames.length === 0) return

      toast.promise(
        Promise.all(
          conversationsNeedingNames.map(async conversation => {
            const response = await fetch('/api/generate-name', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ groupId: conversation.id })
            })

            if (!response.ok) {
              throw new Error(response.status === 429 
                ? 'Please wait a moment before generating more names'
                : 'Failed to generate conversation name'
              )
            }
            return response.json()
          })
        ).finally(() => {
          utils.getUserFiles.invalidate()
        }),
        {
          loading: 'Generating conversation names...',
          success: 'Conversations renamed successfully',
          error: (err) => err.message
        }
      )
    }

    generateNames()
  }, [files])

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id)
    },
    onSettled() {
      setCurrentlyDeletingFile(null)
    },
  })

  const { mutate: updateFile, isPending: isUpdating } = trpc.updateFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
      setEditingId(null)
      setNewName('')
    },
  })
  return (
    <div className="min-h-screen bg-background mt-[4rem]">
      {/* Hero section with stats */}
      <div className="bg-gradient-to-b from-background via-muted to-background dark:from-slate-800/50 dark:to-transparent border-b border-border dark:border-slate-700/50 backdrop-blur-sm">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground dark:text-white font-space-grotesk mb-2">Document Hub</h1>
              <p className="text-muted-foreground dark:text-slate-400">Your AI-powered document workspace</p>
            </div>
           
            <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
          </div>
        </div>
      </div>

      <div className="container">
        {/* Conversations grid */}
        <div className="grid gap-4">
        {files && files.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {files
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-card/90 to-muted/90 dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm border border-border dark:border-slate-700/50 rounded-xl p-6 hover:bg-muted/70 dark:hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    {/* Left side: icon + name/edit input */}
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-teal-500/20 dark:from-indigo-500/20 dark:to-teal-500/20 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary dark:text-teal-400" />
                      </div>

                      <div className="flex-1">
                        <Link
                          href={editingId === file.id ? "#" : `/dashboard/${file.id}`}
                          className="block"
                        >
                          {editingId === file.id ? (
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateFile({ id: file.id, name: newName });
                                }
                              }}
                              className="w-full truncate text-lg font-medium text-foreground dark:text-white bg-transparent border-b border-border dark:border-slate-400 focus:outline-none"
                            />
                          ) : (
                            <h3 className="text-lg font-medium text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">
                              {file.name}
                            </h3>
                          )}
                        </Link>

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground dark:text-slate-400">
                          <span>{format(new Date(file.createdAt), "MMM yyyy")}</span>
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            mocked
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: edit/delete buttons */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {editingId === file.id ? (
                        <>
                          <Button
                            onClick={() => updateFile({ id: file.id, name: newName })}
                            disabled={isUpdating}
                            size="sm"
                            variant="default"
                            className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 dark:from-indigo-600 dark:to-teal-500 dark:hover:from-indigo-500 dark:hover:to-teal-400 text-primary-foreground"
                          >
                            {isUpdating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Save"
                            )}
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingId(null);
                              setNewName("");
                            }}
                            size="sm"
                            variant="outline"
                            className="border-border hover:bg-muted dark:border-slate-700 dark:hover:bg-slate-800"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(file.id);
                              setNewName(file.name);
                            }}
                            variant="ghost"
                            className="hover:bg-muted dark:hover:bg-transparent"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground dark:text-slate-300 dark:hover:text-white" />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFile({ id: file.id });
                            }}
                            variant="ghost"
                            className="hover:bg-muted dark:hover:bg-transparent"
                          >
                             {currentlyDeletingFile === file.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-5 w-5 text-muted-foreground hover:text-destructive dark:text-slate-300 dark:hover:text-red-400" />
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
        </div>

        {isLoading ? (
          <div className="space-y-4 mt-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gradient-to-br from-card/90 to-muted/90 dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm border border-border dark:border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-muted dark:bg-slate-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-muted dark:bg-slate-700 rounded w-1/2" />
                    <div className="flex gap-4 mt-3">
                      <div className="h-3 bg-muted dark:bg-slate-700 rounded w-1/4" />
                      <div className="h-3 bg-muted dark:bg-slate-700 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!isLoading && files?.length == 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-card/80 to-muted/80 dark:from-slate-800/30 dark:to-slate-800/30 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto border border-border dark:border-slate-700/50">
              <FileText className="h-12 w-12 text-muted-foreground dark:text-slate-500 mx-auto mb-4" />
              <p className="text-foreground dark:text-slate-300 text-lg mb-2">No conversations yet</p>
              <p className="text-muted-foreground dark:text-slate-400">Upload a document to get started with AI-powered conversations.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}