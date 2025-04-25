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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-16 ">
      {/* Hero section with stats */}
      <div className="bg-gradient-to-b from-slate-800/50 to-transparent border-b border-slate-700/50 backdrop-blur-sm">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white font-space-grotesk mb-2">Document Hub</h1>
              <p className="text-slate-400">Your AI-powered document workspace</p>
            </div>
           
                    <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1">Total Documents</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1">Active Conversations</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1">Total Messages</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="container">
        {/* Search and filter */}
        {/* <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10 bg-slate-800/30 border-slate-700/50 text-white placeholder:text-slate-500 w-full"
            />
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div> */}

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
          className="group bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-start justify-between">
            {/* Left side: icon + name/edit input */}
            <div className="flex items-start space-x-4 flex-1">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-500/20 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-teal-400" />

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
                      className="w-full truncate text-lg font-medium text-white bg-transparent border-b border-slate-400 focus:outline-none"
                    />
                  ) : (
                    <h3 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
                      {file.name}
                    </h3>
                  )}
                </Link>

                <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
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
                    // className="bg-transparent"                    size="icon"
                  >
                    <Pencil className="h-4 w-4 text-slate-300 hover:text-white hover:bg-transparent" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile({ id: file.id });
                    }}
                    variant="ghost"
                    // className="bg-transparent"                    size="icon"

                  >
                     {currentlyDeletingFile === file.id ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Trash className="h-5 w-5 text-slate-300 hover:text-red-400" />
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
          className="animate-pulse bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 rounded-xl bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-700 rounded w-1/2" />
              <div className="flex gap-4 mt-3">
                <div className="h-3 bg-slate-700 rounded w-1/4" />
                <div className="h-3 bg-slate-700 rounded w-1/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>        ):(
          null
        )}

        {!isLoading && files?.length == 0 && (
          <div className="text-center py-12">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
            <FileText className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-300 text-lg mb-2">No conversations yet</p>
            <p className="text-slate-400">Upload a document to get started with AI-powered conversations.</p>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}