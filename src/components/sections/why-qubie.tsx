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
    icon: <BrainCircuit className="h-6 w-6 text-indigo-400" />
  },
  {
    title: "Multi-Document Cross-Reference",
    qubie: "Ask questions across 10+ files simultaneously",
    others: "Limited to single document questions",
    icon: <FileSearch className="h-6 w-6 text-indigo-400" />
  },
  {
    title: "Custom AI Personas",
    qubie: "Tailor your AI to speak like a lawyer, analyst, or marketer",
    others: "One-size-fits-all generic responses",
    icon: <UserCog className="h-6 w-6 text-indigo-400" />
  },
  {
    title: "Chat History & Session Saving",
    qubie: "View previous queries and responses in an organized history.",
    others: "No memory of past interactions.",
    icon: <Users className="h-6 w-6 text-indigo-400" />
  }
]

export function WhyQubie() {
  return (
    <section id="why-qubie" className="py-24 relative">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-indigo-500/10 rounded-full text-indigo-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            COMPETITIVE EDGE
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Beyond Basic Chatbots—
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
              Meet Contextual Intelligence
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg"
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
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800">
              <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-800 bg-slate-800/50">
                <div className="col-span-1 font-medium text-slate-400">Features</div>
                <div className="col-span-1 font-medium text-teal-400">Qubie</div>
                <div className="col-span-1 font-medium text-slate-500">Others</div>
              </div>
              
              <div className="divide-y divide-slate-800">
                {differentiators.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-4">
                    <div className="col-span-1 flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-white text-sm">{item.title}</span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-teal-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{item.qubie}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span className="text-slate-500 text-sm">{item.others}</span>
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
              <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2">
                See the Difference in Action
              </h3>
              <p className="text-slate-400">
                Compare how Qubie's contextual understanding delivers superior insights compared to basic document chatbots.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={cn(
                  "p-4 rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90",
                  "border border-slate-700/50 backdrop-blur-sm"
                )}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-white">Q</span>
                    </div>
                    <span className="font-medium text-white">Qubie</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-slate-300">How did our market share change compared to competition last quarter?</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-lg p-3">
                      <p className="text-sm text-white">
                        Your market share increased from 23.4% to 26.8% (+3.4%), while Competitor A dropped from 31.2% to 28.5% (-2.7%) and Competitor B remained stable at 19.1%. This shift appears driven by your new product line launch in May, which captured 9% of new market entrants according to p.42 of your quarterly report.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={cn(
                  "p-4 rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90",
                  "border border-slate-700/50 backdrop-blur-sm"
                )}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-white">O</span>
                    </div>
                    <span className="font-medium text-slate-400">Others</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-slate-300">How did our market share change compared to competition last quarter?</p>
                    </div>
                    
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <p className="text-sm text-slate-400">
                        According to the document, your market share is 26.8% in Q2. The document mentions competitor market shares on page 42.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 mt-6">
                <p className="text-indigo-300 text-sm">
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