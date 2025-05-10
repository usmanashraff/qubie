"use client"

import React from "react"
import { Upload, MessageSquare, FileText, ChevronRight } from "lucide-react"
import { motion } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Upload Your Documents",
    description: "Drag and drop your files or select them from your computer. We support PDFs, Word docs, spreadsheets and more.",
    icon: <Upload className="h-6 w-6" />,
    color: "from-primary to-blue-500 dark:from-indigo-500 dark:to-blue-500"
  },
  {
    number: "02",
    title: "AI-Powered Analysis",
    description: "Our advanced AI reads and understands your documents, creating a deep knowledge base ready for your questions.",
    icon: <FileText className="h-6 w-6" />,
    color: "from-violet-500 to-primary dark:from-violet-500 dark:to-indigo-500"
  },
  {
    number: "03",
    title: "Chat & Get Answers",
    description: "Ask questions in plain English and get accurate answers with citations from your documents instantly.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "from-teal-500 to-cyan-500"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 opacity-50 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border dark:via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p 
            className="text-sm font-medium text-primary dark:text-teal-400 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Three Simple Steps
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get answers from your documents in seconds
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative rounded-xl p-8",
                "bg-gradient-to-b from-card/70 to-muted/70 dark:from-slate-800/70 dark:to-slate-900/70",
                "border border-border dark:border-slate-700/50 backdrop-blur-sm",
                "transition-all duration-300 ease-out hover:translate-y-[-8px]"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-background dark:bg-slate-900 border-2 border-primary dark:border-indigo-500 flex items-center justify-center text-sm font-bold text-primary dark:text-indigo-400">
                {index + 1}
              </div>

              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                `bg-gradient-to-r ${step.color}`
              )}>
                {React.cloneElement(step.icon as React.ReactElement, { className: "h-7 w-7 text-white" })}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-space-grotesk mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}