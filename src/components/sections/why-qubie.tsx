"use client"

import React from "react"
import { motion } from "@/lib/motion"
import { Check, X, BrainCircuit, FileSearch, Users, UserCog } from "lucide-react"
import { cn } from "@/lib/utils"

const differentiators = [
  {
    title: "Deep Contextual Analysis",
    qubie: "Understands relationships between data points across entire documents",
    others: "Relies on simple keyword matching and basic context",
    icon: <BrainCircuit className="h-6 w-6 text-primary dark:text-indigo-400" />
  },
  {
    title: "Multi-Document Cross-Reference",
    qubie: "Ask questions across 10+ files simultaneously",
    others: "Limited to single document questions",
    icon: <FileSearch className="h-6 w-6 text-primary dark:text-indigo-400" />
  },
  {
    title: "Custom AI Personas",
    qubie: "Tailor your AI to speak like a lawyer, analyst, or marketer",
    others: "One-size-fits-all generic responses",
    icon: <UserCog className="h-6 w-6 text-primary dark:text-indigo-400" />
  },
  {
    title: "Chat History & Session Saving",
    qubie: "View previous queries and responses in an organized history.",
    others: "No memory of past interactions.",
    icon: <Users className="h-6 w-6 text-primary dark:text-indigo-400" />
  }
]

export function WhyQubie() {
  return (
    <section id="why-qubie" className="py-24 relative hidden md:block bg-background">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 opacity-50 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border dark:via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-indigo-500/20 dark:to-teal-500/20 backdrop-blur-sm rounded-full mb-3 border border-primary/10 dark:border-indigo-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">
              COMPETITIVE EDGE
            </span>
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Beyond Basic Chatbots—
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">
              Meet Contextual Intelligence
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground dark:text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See how Qubie outperforms traditional document chatbots with advanced AI capabilities designed for professionals.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-card/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border dark:border-slate-800">
              <div className="grid grid-cols-3 gap-4 p-4 border-b border-border dark:border-slate-800 bg-muted/50 dark:bg-slate-800/50">
                <div className="col-span-1 font-medium text-muted-foreground dark:text-slate-400">Features</div>
                <div className="col-span-1 font-medium text-primary dark:text-teal-400">Qubie</div>
                <div className="col-span-1 font-medium text-muted-foreground dark:text-slate-500">Others</div>
              </div>
              
              <div className="divide-y divide-border dark:divide-slate-800">
                {differentiators.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-4">
                    <div className="col-span-1 flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-foreground dark:text-white text-sm">{item.title}</span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary dark:text-teal-400 flex-shrink-0" />
                        <span className="text-foreground dark:text-slate-300 text-sm">{item.qubie}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                        <span className="text-muted-foreground dark:text-slate-500 text-sm">{item.others}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Comparison Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-space-grotesk text-foreground dark:text-white mb-2">
                See the Difference in Action
              </h3>
              <p className="text-muted-foreground dark:text-slate-400">
                Compare how Qubie's contextual understanding delivers superior insights compared to basic document chatbots.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={cn(
                  "p-4 rounded-xl bg-gradient-to-br from-card/90 to-muted/90 dark:from-slate-800/90 dark:to-slate-900/90",
                  "border border-border dark:border-slate-700/50 backdrop-blur-sm"
                )}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-500 dark:to-teal-400 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-primary-foreground dark:text-white">Q</span>
                    </div>
                    <span className="font-medium text-foreground dark:text-white">Qubie</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-muted dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-foreground dark:text-slate-300">How did our market share change compared to competition last quarter?</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-indigo-500/20 dark:to-teal-500/20 rounded-lg p-3">
                      <p className="text-sm text-foreground dark:text-white">
                        Your market share increased from 23.4% to 26.8% (+3.4%), while Competitor A dropped from 31.2% to 28.5% (-2.7%) and Competitor B remained stable at 19.1%. This shift appears driven by your new product line launch in May, which captured 9% of new market entrants according to p.42 of your quarterly report.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={cn(
                  "p-4 rounded-xl bg-gradient-to-br from-card/90 to-muted/90 dark:from-slate-800/90 dark:to-slate-900/90",
                  "border border-border dark:border-slate-700/50 backdrop-blur-sm"
                )}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-muted dark:bg-slate-700 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-muted-foreground dark:text-white">O</span>
                    </div>
                    <span className="font-medium text-muted-foreground dark:text-slate-400">Others</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-muted dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-foreground dark:text-slate-300">How did our market share change compared to competition last quarter?</p>
                    </div>
                    
                    <div className="bg-muted/30 dark:bg-slate-700/30 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        According to the document, your market share is 26.8% in Q2. The document mentions competitor market shares on page 42.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 to-teal-500/5 dark:bg-indigo-900/20 border border-primary/10 dark:border-indigo-500/30 rounded-lg p-4 mt-6">
                <p className="text-primary dark:text-indigo-300 text-sm">
                  <span className="font-bold">Qubie advantage:</span> Identifies specific changes, contextualizes against competitors, highlights driving factors, and provides exact citation to the source information in your document.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}