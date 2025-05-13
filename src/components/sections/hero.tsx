"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion } from "@/lib/motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden bg-background">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-0" />
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/20 dark:bg-indigo-900 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-teal-500/20 dark:bg-teal-900 rounded-full filter blur-[100px]" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat opacity-10 dark:opacity-20 z-0" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 pt-0 items-center">
          {/* Hero content */}
          <div className="flex flex-col space-y-8">
            <div>
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-indigo-500/20 dark:to-teal-500/20 backdrop-blur-sm rounded-full mb-6 border border-primary/10 dark:border-indigo-500/20">
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">
                  AI Document Intelligence
                </span>
              </div>
              
              <h1 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-300">
              Chat with Your Documents
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">—Powered by AI.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground md:text-xl max-w-xl leading-relaxed">
              Get instant answers from your files. No more searching—just ask.


              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
           <Link
           href="/api/auth/login"
           >
               <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 dark:from-indigo-600 dark:to-teal-500 dark:hover:from-indigo-500 dark:hover:to-teal-400 text-primary-foreground border-0 rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Free Now →
              </Button>
           </Link>
              
  
            </div>
          </div>
          
          {/* Hero visual */}
          <div className="relative h-[600px] flex items-center justify-center">
            <motion.div 
              className="relative w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated document interface */}
              <div className="relative bg-card/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-border dark:border-slate-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="h-4 bg-gradient-to-br from-primary/30 to-teal-500/30 dark:from-indigo-500/30 dark:to-teal-500/3 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gradient-to-br from-primary/30 to-teal-500/30 dark:from-indigo-500/30 dark:to-teal-500/3 rounded-full w-1/2"></div>
                  <div className="h-4 bg-gradient-to-br from-primary/30 to-teal-500/30 dark:from-indigo-500/30 dark:to-teal-500/3 rounded-full w-5/6"></div>
                  
                  <div className="mt-8 p-4 bg-primary/5 dark:bg-slate-700/30 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-indigo-500/20"></div>
                      <div className="h-3 bg-muted dark:bg-slate-600 rounded-full w-24"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted dark:bg-slate-600 rounded-full w-full"></div>
                      <div className="h-3 bg-muted dark:bg-slate-600 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/30 to-teal-500/30 dark:from-indigo-500/30 dark:to-teal-500/30 rounded-2xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-primary/30 dark:from-purple-500/30 dark:to-indigo-500/30 rounded-2xl"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
              
              {/* Floating badges */}
              <motion.div
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-background dark:bg-slate-900 rounded-full px-4 py-2 shadow-lg border border-border dark:border-slate-700">
                  <div className="text-sm font-medium text-foreground">Smart Analysis</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-background dark:bg-slate-900 rounded-full px-4 py-2 shadow-lg border border-border dark:border-slate-700">
                  <div className="text-sm font-medium text-foreground">AI-Powered</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
     
    </section>
  )
}