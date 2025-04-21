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
    description: "PDFs, spreadsheets, code repos, and 20+ formats. Seamlessly work with all your document types in one platform.",
    icon: <Files className="h-6 w-6 text-indigo-400" />
  },
  {
    title: "Support Multiple Documents",
    description: "Qubie supports querying across up to 10 documents simultaneously** for deeper insights.",
    icon: <BookMarked className="h-6 w-6 text-teal-400" />
  },
  // {
  //   title: "API & Integrations",
  //   description: "Connect with Slack, Notion, Zapier, and more. Build custom workflows with our comprehensive API.",
  //   icon: <Puzzle className="h-6 w-6 text-violet-400" />
  // }
]

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-teal-500/10 rounded-full text-teal-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            KEY CAPABILITIES
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Built for Professional Workflows
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Powerful features designed to transform how you work with documents, saving you hours of manual effort.
          </motion.p>
        </div>
        
        <div className="flex lg:grid-cols-4 gap-6 ">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Feature Showcase */}
        <motion.div 
          className="mt-20 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-6 text-white">
                Experience Smart Citations in Action
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Stop hunting for information sources. Qubie automatically highlights and cites the exact location of information in your documents, giving you confidence in AI-generated responses.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Pinpoint accuracy to specific pages and sections",
                  "Hover over highlights to see original context",
                  "Export citations with your summaries",
                  "Full transparency for regulatory compliance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-teal-400" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative bg-slate-900 p-6 flex items-center justify-center">
              <div className="relative max-w-md w-full bg-slate-800 rounded-lg p-4 shadow-xl">
                <div className="border-b border-slate-700 pb-3 mb-4">
                  <h4 className="text-white font-medium">Financial Report Analysis</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-sm text-slate-300">What were the main factors affecting our profit margin last quarter?</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      The main factors affecting profit margins were:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-white">
                      <li className="flex items-start">
                        <span className="bg-yellow-500/20 px-1 rounded mr-1">Increased raw material costs</span> 
                        <span className="text-xs text-yellow-400 ml-1">[p.14]</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-teal-500/20 px-1 rounded mr-1">New overseas tariffs in Asian markets</span>
                        <span className="text-xs text-teal-400 ml-1">[p.27-28]</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-indigo-500/20 px-1 rounded mr-1">One-time infrastructure investment</span>
                        <span className="text-xs text-indigo-400 ml-1">[p.42]</span>
                      </li>
                    </ul>
                    <p className="text-sm text-white mt-2">
                      These factors led to a temporary 3.2% decrease in overall margins, expected to recover next quarter.
                    </p>
                  </div>
                  
                  <div className="border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                      <BookMarked className="h-4 w-4 text-teal-400" />
                      <span className="font-medium">Citation Preview</span>
                    </div>
                    <div className="bg-slate-900/70 p-2 rounded text-xs text-slate-400">
                      "Raw material costs increased by 7.2% compared to the previous quarter, primarily driven by global supply chain disruptions..." <span className="text-teal-400">Page 14, Q2 Financial Report</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  return (
    <motion.div 
      className={cn(
        "group relative rounded-xl p-6",
        "bg-gradient-to-b from-slate-800/70 to-slate-900/70",
        "border border-slate-700/50 backdrop-blur-sm",
        "transition-all duration-300 ease-out hover:translate-y-[-8px]",
        "hover:shadow-lg hover:shadow-slate-700/10"
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
          "bg-gradient-to-br from-indigo-500 via-transparent to-teal-500"
        )} />
      </div>
      
      {/* Card glow border effect */}
      <div className="absolute inset-0 rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-px rounded-xl bg-gradient-to-br from-indigo-500/30 via-transparent to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 mb-4">
          {feature.icon}
        </div>
        
        <h3 className="text-xl font-bold font-space-grotesk mb-3 text-white">
          {feature.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed">
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