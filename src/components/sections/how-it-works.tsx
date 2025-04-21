"use client"

import React from "react"
import { Upload, MessageSquare, Clipboard, ChevronRight } from "lucide-react"
import { motion } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
const steps = [
  {
    number: "01",
    title: "Upload Your Documents",
    description: "Drag and drop your files or select them from cloud storage. Supports PDFs, Word, Excel, PowerPoint, and 20+ other formats.",
    icon: <Upload className="h-6 w-6" />,
    color: "from-indigo-500 to-blue-500"
  },
  {
    number: "02",
    title: "Chat With Your Content",
    description: "Ask questions in natural language about your documents. Qubie's AI understands context and relationships between data points.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "from-violet-500 to-indigo-500"
  },
  {
    number: "03",
    title: "Take Action & Collaborate",
    description: "Export insights, share with teammates, or integrate findings into your workflow with our comprehensive API.",
    icon: <Clipboard className="h-6 w-6" />,
    color: "from-teal-500 to-cyan-500"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p 
            className="text-sm font-medium text-teal-400 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            SIMPLE PROCESS
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            How Qubie Works
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transform your document workflow in three simple steps. No more wasting time searching through pages of content.
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-indigo-500/30 via-violet-500/30 to-teal-500/30 hidden md:block" />
          
          <div className="space-y-12 md:space-y-24 relative">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
        <Link
                  href='/dashboard'>
          <Button className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white border-0 rounded-full px-8 py-6 shadow-lg shadow-indigo-900/20 hover:shadow-xl hover:shadow-indigo-700/20 transition-all duration-300 transform hover:-translate-y-1">
            Try Qubie Now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function StepItem({ step, index }: { step: typeof steps[0], index: number }) {
  const isEven = index % 2 === 0
  
  return (
    <motion.div 
      className="relative grid md:grid-cols-2 gap-8 items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Step content - order changes based on even/odd */}
      <div className={cn("flex flex-col", {
        "md:order-1": !isEven,
        "md:text-right": !isEven,
        "md:items-end": !isEven
      })}>
        <span className="text-sm font-medium text-teal-400 mb-2">{step.number}</span>
        <h3 className="text-2xl font-bold font-space-grotesk mb-4 text-white">{step.title}</h3>
        <p className="text-slate-400 max-w-md">{step.description}</p>
      </div>
      
      {/* Step visualization */}
      <div className={cn("relative", {
        "md:order-0": !isEven,
      })}>
        <div className="relative z-10">
          <div className={cn(
            "w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden",
            "bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm",
            "border border-slate-700/50"
          )}>
            <div className="h-full w-full p-6 flex flex-col items-center justify-center">
              {/* Step icon with gradient */}
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                `bg-gradient-to-r ${step.color}`
              )}>
                {React.cloneElement(step.icon as React.ReactElement, { className: "h-8 w-8 text-white" })}
              </div>
              
              {/* Step-specific visualization */}
              {index === 0 && (
                <div className="w-full max-w-xs h-24 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center mt-4">
                  <p className="text-slate-400 text-sm">Drag files here or click to browse</p>
                </div>
              )}
              
              {index === 1 && (
                <div className="w-full max-w-xs mt-4 space-y-3">
                  <div className="bg-slate-800 rounded-lg p-2 text-slate-300 text-sm">
                    What's the main conclusion in section 5?
                  </div>
                  <div className="bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-lg p-2 text-white text-sm ml-auto">
                    Section 5 concludes that renewable energy adoption increased 32% in Q2...
                  </div>
                </div>
              )}
              
              {index === 2 && (
                <div className="w-full max-w-xs mt-4 flex flex-wrap gap-2 justify-center">
                  <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">Export PDF</div>
                  <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">Share</div>
                  <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">Slack</div>
                  <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">Notion</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Step number marker for md screens */}
        <div className={cn(
          "hidden md:flex absolute z-20 w-12 h-12 rounded-full bg-slate-900 border-4",
          "items-center justify-center font-bold text-white",
          "border-indigo-500", {
            "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2": isEven,
            "right-0 top-1/2 translate-x-1/2 -translate-y-1/2": !isEven,
          }
        )}>
          {index + 1}
        </div>
      </div>
    </motion.div>
  )
}