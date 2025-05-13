"use client"

import React from "react"
import { motion } from "@/lib/motion"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import UpgradeButton from "../UpgradeButton"

const pricingTiers = [
  {
    name: "Free",
    description: "For Individuals exploring document AI",
    price: "$0",
    period: "forever",
    features: [
      "3 documents per conversations",
      "Max 200 pages per document",
      "Max 4MB file size",
      "Basic AI responses",
      "Mobile-friendly interface",
      "Multiple documents included i.e. docx, xlsx, pptx, pdf",
      "No credit card required"
    ],
    cta: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    description: "For professionals and small teams",
    price: "$10",
    period: "per month",
    features: [
      "5 documents per document",
      "Max 500 pages per document",
      "Max 32MB file size",
      "Advanced AI responses",
      "Cross-document references",
      "Priority support",
      "Multiple documents included i.e. docx, xlsx, pptx, pdf"
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular"
  },
  
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative bg-background">
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
              PRICING PLANS
            </span>
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground dark:text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose the plan that fits your needs. All plans include a 14-day free trial with no credit card required.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground dark:text-slate-400">
            All plans include <span className="text-foreground dark:text-white">24-hour availability</span>, 
            <span className="text-foreground dark:text-white"> secure infrastructure</span>, and 
            <span className="text-foreground dark:text-white"> regular feature updates</span>. 
            Need a custom plan? Contact our sales team.
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-500 dark:to-indigo-400 mr-2"></div>
              <span className="text-sm text-muted-foreground dark:text-slate-400">SOC 2 Compliance</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-teal-500 dark:from-teal-500 dark:to-teal-400 mr-2"></div>
              <span className="text-sm text-muted-foreground dark:text-slate-400">GDPR Ready</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-teal-500 dark:from-purple-500 dark:to-purple-400 mr-2"></div>
              <span className="text-sm text-muted-foreground dark:text-slate-400">HIPAA Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PricingCard({ tier, index }: { tier: typeof pricingTiers[0], index: number }) {
  return (
    <motion.div 
      className={cn(
        "relative rounded-xl overflow-hidden",
        tier.highlight 
          ? "border-2 border-primary dark:border-indigo-500" 
          : "border border-border dark:border-slate-700/50",
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      viewport={{ once: true }}
    >
      {/* Badge for highlighted tier */}
      {tier.highlight && tier.badge && (
        <div className="absolute top-0 right-0 -mt-1 -mr-1 z-10">
          <div className="bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-500 dark:to-teal-500 text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-lg">
            {tier.badge}
          </div>
        </div>
      )}
      
      {/* Glow effect for highlighted tier */}
      {tier.highlight && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent dark:from-indigo-500/10" />
        </div>
      )}
      
      <div className={cn(
        "relative z-1 p-8",
        "bg-gradient-to-br from-card/90 to-muted/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-sm"
      )}>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">
            {tier.name}
          </h3>
          <p className="text-muted-foreground dark:text-slate-400 text-sm min-h-[40px]">
            {tier.description}
          </p>
        </div>
        
        <div className="text-center mb-6">
          <div className="flex items-end justify-center">
            <span className="text-4xl font-bold text-foreground dark:text-white">{tier.price}</span>
            {tier.price !== "Custom" && (
              <span className="text-muted-foreground dark:text-slate-400 ml-1 mb-1">/{tier.period}</span>
            )}
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {tier.features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-primary/20 to-teal-500/20 dark:bg-teal-500/20 flex items-center justify-center mr-3 mt-0.5">
                <Check className="h-3 w-3 text-primary dark:text-teal-400" />
              </div>
              <span className="text-foreground dark:text-slate-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
     
          <UpgradeButton /> 
      </div>
    </motion.div>
  )
}