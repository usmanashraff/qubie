"use client"

import React, { useState } from "react"
import { Sparkles, Shield, Boxes } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
const valueCards = [
  {
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    title: "Instant AI Insights",
    description: "Extract insights from your documents in seconds, not hours. Ask questions in natural language and get precise answers."
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: "Military-Grade Encryption",
    description: "Enterprise-level security with end-to-end encryption and zero data retention. Your information never leaves your control."
  },
  {
    icon: <Boxes className="w-6 h-6 text-teal-400" />,
    title: "Integrate with Your Workflow",
    description: "Seamlessly connects with your existing tools like Slack, Notion, and Zapier to enhance your productivity ecosystem."
  }
]

export function ValueProposition() {
  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Unlock Your Document Intelligence
          </motion.h2>
          <motion.p 
            className="text-slate-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Stop wasting time searching through pages of content. Qubie transforms how you interact with your information.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {valueCards.map((card, index) => (
            <ValueCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({ card, index }: { card: typeof valueCards[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      viewport={{ once: true }}
      className={cn(
        "group relative rounded-xl p-6 h-full",
        "bg-gradient-to-b from-slate-800/70 to-slate-900/70",
        "border border-slate-700/50 backdrop-blur-sm",
        "transition-all duration-300 ease-out"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px -20px rgba(79, 70, 229, 0.25)' : 'none'
      }}
    >
      {/* Card background effects */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          "bg-gradient-to-br from-indigo-500 via-transparent to-teal-500"
        )} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.3),transparent,transparent)] pointer-events-none" />
      </div>
      
      {/* Card glow border effect */}
      <div className="absolute inset-0 rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-px rounded-xl bg-gradient-to-br from-indigo-500/30 via-transparent to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 mb-4">
          {card.icon}
        </div>
        
        <h3 className="text-xl font-bold font-space-grotesk mb-3 text-white">
          {card.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed flex-grow">
          {card.description}
        </p>
        
        <div className="mt-6 text-teal-400 text-sm font-medium flex items-center transition-transform duration-300 group-hover:translate-x-1">
          Learn more 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}