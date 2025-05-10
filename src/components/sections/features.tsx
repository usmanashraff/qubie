"use client"

import React from "react"
import { motion } from "@/lib/motion"
import { Sparkles, Files, BookMarked, Puzzle } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "AI-Powered Insights",
    description: "Ask for summaries, trends, or action items. Our AI understands complex queries and delivers precise, contextual answers.",
    icon: <Sparkles className="h-6 w-6 text-yellow-400" />
  },
  {
    title: "Universal Compatibility",
    description: "PDFs, spreadsheets, word docx, and 6 formats. Seamlessly work with all your document types in one platform.",
    icon: <Files className="h-6 w-6 text-indigo-400" />
  },
  {
    title: "Multiple documents",
    description: "AI highlights exact sources from your documents, ensuring transparency and atomicity in every response.",
    icon: <BookMarked className="h-6 w-6 text-teal-400" />
  },
  {
    title: "Hight Accuracy",
    description: "we offer hight accuracy - qubie can process complex quries because we're using reasoning model by Google.",
    icon: <Puzzle className="h-6 w-6 text-violet-400" />
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-background">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 opacity-50 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border dark:via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-primary/10 dark:bg-teal-500/10 rounded-full text-primary dark:text-teal-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            KEY CAPABILITIES
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Built for Professional Workflows
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground dark:text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Powerful features designed to transform how you work with documents, saving you hours of manual effort.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
      
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  return (
    <motion.div 
      className={cn(
        "group relative rounded-xl p-6",
        "bg-card/50 dark:bg-slate-800/50 backdrop-blur-sm",
        "border border-border dark:border-slate-700/50",
        "transition-all duration-300 ease-out hover:translate-y-[-8px]",
        "hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-indigo-700/10"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      viewport={{ once: true }}
    >
      {/* Card background effects */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          "bg-gradient-to-br from-primary to-teal-500 dark:from-indigo-500 dark:to-teal-500"
        )} />
      </div>
      
      {/* Card glow border effect */}
      <div className="absolute inset-0 rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-px rounded-xl bg-gradient-to-br from-primary/30 via-transparent to-teal-500/30 dark:from-indigo-500/30 dark:via-transparent dark:to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border dark:border-slate-700/50 mb-4">
          {feature.icon}
        </div>
        
        <h3 className="text-xl font-bold font-space-grotesk mb-3 text-foreground dark:text-white">
          {feature.title}
        </h3>
        
        <p className="text-muted-foreground dark:text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}