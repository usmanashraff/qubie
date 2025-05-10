"use client"

import React from "react"
import { motion } from "@/lib/motion"
import { Sparkles, FileText, Target, DollarSign } from "lucide-react"

const comparison = [
  {
    feature: "Accuracy Rate",
    traditional: "low",
    basic: "medium",
    qubie: "high"
  },
  {
    feature: "Document Formats",
    traditional: "PDF only",
    basic: "2-3 formats",
    qubie: "6 formats"
  },
  {
    feature: "Multi-document Analysis",
    traditional: "No",
    basic: "No",
    qubie: "5"
  },
  {
    feature: "Image processing",
    traditional: "No",
    basic: "No",
    qubie: "Yes"
  }
]

const features = [
  {
    icon: <Target className="h-6 w-6 text-indigo-400" />,
    title: "95%+ Accuracy",
    description: "Our advanced AI models deliver industry-leading accuracy in document analysis and question answering."
  },
  {
    icon: <FileText className="h-6 w-6 text-teal-400" />,
    title: "Universal Format Support",
    description: "Work with PDFs, Word docs, Excel sheets, PowerPoint, plain text, and more - all in one place."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-amber-400" />,
    title: "Unlimited Documents",
    description: "Upload and analyze as many documents as you need. No artificial limits on document count or size."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-green-400" />,
    title: "Best Value",
    description: "Get more features at a lower price point than any competitor in the market."
  }
]

export function WhyQubie() {
  return (
    <section id="why-qubie" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border dark:via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-primary/10 dark:bg-indigo-500/10 rounded-full text-primary dark:text-indigo-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            THE QUBIE ADVANTAGE
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Why Choose us!
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400 ml-2">
              Qubie
            </span>
          </motion.h2>
        </div>


        {/* Comparison Table */}
        <motion.div 
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-border dark:border-slate-700/50 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-border dark:border-slate-700/50">
              <div className="text-muted-foreground font-medium">Feature</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Traditional Tools</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Basic AI</div>
              <div className="text-center text-sm font-medium text-primary dark:text-indigo-400">Qubie</div>
            </div>
            
            {/* Comparison rows */}
            <div className="divide-y divide-border dark:divide-slate-700/50">
              {comparison.map((item, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-4 gap-4 p-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="font-medium text-foreground">{item.feature}</div>
                  <div className="text-center text-muted-foreground">{item.traditional}</div>
                  <div className="text-center text-muted-foreground">{item.basic}</div>
                  <div className="text-center font-medium text-primary dark:text-indigo-400">{item.qubie}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom message */}
          <motion.div 
            className="mt-8 text-center text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            * Based on comparative analysis with leading document AI solutions in 2025
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}