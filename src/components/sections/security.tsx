"use client"

import React from "react"
import { motion } from "@/lib/motion"
import { Shield, Lock, Hourglass as HourglassEmpty } from "lucide-react"
import { cn } from "@/lib/utils"

const securityFeatures = [
  {
    icon: <Shield className="h-8 w-8 text-indigo-400" />,
    title: "SOC 2 & GDPR Certified",
    description: "Enterprise-grade security with rigorous compliance protocols to protect your sensitive information."
  },
  {
    icon: <Lock className="h-8 w-8 text-teal-400" />,
    title: "End-to-End Encryption",
    description: "Military-grade encryption ensures your documents are secure during transit and at rest."
  },
  {
    icon: <HourglassEmpty className="h-8 w-8 text-amber-400" />,
    title: "Zero Data Retention",
    description: "Documents are processed in isolated environments and never stored longer than necessary."
  }
]

const clientLogos = [
  { name: "Acme Inc", logo: "https://api.dicebear.com/7.x/initials/svg?seed=AI" },
  { name: "TechCorp", logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC" },
  { name: "Globex", logo: "https://api.dicebear.com/7.x/initials/svg?seed=GL" },
  { name: "Initech", logo: "https://api.dicebear.com/7.x/initials/svg?seed=IN" }
]

export function Security() {
  return (
    <section id="security" className="py-24 relative">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            ENTERPRISE SECURITY
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Your Data, Fortified
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Enterprise-grade security measures that keep your sensitive documents protected while leveraging AI intelligence.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <SecurityCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Trust badges */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-medium text-slate-300 mb-8">Trusted by Industry Leaders</h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {clientLogos.map((client, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/70 hover:bg-slate-800 transition-all duration-300 hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ width: '140px', height: '80px' }}
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-10 object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300" 
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-5 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-indigo-300 text-sm">
              <span className="font-bold">Our commitment:</span> At Qubie, we believe security isn't a feature—it's a foundation. Our SOC 2 Type II certification verifies our systems are designed with security, availability, and confidentiality as core principles.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SecurityCard({ feature, index }: { feature: typeof securityFeatures[0], index: number }) {
  return (
    <motion.div 
      className={cn(
        "relative rounded-xl p-8",
        "bg-gradient-to-b from-slate-800/70 to-slate-900/70",
        "border border-slate-700/50 backdrop-blur-sm",
        "transition-all duration-300 ease-out"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      viewport={{ once: true }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-slate-800/80 border border-slate-700/50 mb-5">
          {feature.icon}
        </div>
        
        <h3 className="text-xl font-bold font-space-grotesk mb-4 text-white">
          {feature.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}