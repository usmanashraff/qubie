"use client"

import React from "react"
import { motion } from "@/lib/motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Qubie handle sensitive data?",
    answer: "Qubie employs end-to-end encryption for all documents. Your files are processed in isolated environments, and we maintain a strict zero-data retention policy. We're SOC 2 and GDPR compliant, with HIPAA compliance available for Enterprise plans. Your sensitive information never leaves your control."
  },
  {
    question: "Can I train Qubie on industry-specific jargon?",
    answer: "Absolutely! Pro and Enterprise plans include Custom AI Personas that can be trained to understand specific industry terminology, acronyms, and technical language. You can create multiple personas (e.g., Legal Expert, Financial Analyst) to match your specific needs."
  },
  {
    question: "What file sizes and types are supported?",
    answer: "Qubie supports documents up to 500MB. We handle over 20 formats including PDF, DOCX, XLSX, PPT, TXT, CSV, JSON, HTML, and markdown. For Enterprise users, we also support DICOM, PPTX with animations, LaTeX, and more specialized formats. If you have a particular format need, please contact us."
  },
  {
    question: "How accurate are Qubie's AI-generated responses?",
    answer: "Qubie's accuracy is industry-leading due to our deep contextual analysis capabilities. Unlike simple chatbots, we analyze relationships between data points across documents. Our Smart Citations feature provides transparency by highlighting exactly where information was sourced, allowing you to verify accuracy. Enterprise users can configure confidence thresholds and require citations for all responses."
  },
  {
    question: "How does Qubie's pricing work for teams?",
    answer: "Pro plans include up to 3 users. For larger teams, our Enterprise plan offers custom pricing based on user count, document volume, and specific feature requirements. Enterprise plans include team workspaces, role-based access controls, and usage analytics. Contact our sales team for a tailored quote."
  },
  {
    question: "Do you offer API access for integration with our internal systems?",
    answer: "Yes, Pro plans include API access with 1,000 calls per month. Enterprise plans include unlimited API calls and dedicated integration support. Our comprehensive REST API allows you to upload documents, query documents, manage users, and automate workflows. We provide SDKs for JavaScript, Python, Ruby, and Java."
  }
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 relative">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-violet-500/10 rounded-full text-violet-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            QUESTIONS & ANSWERS
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Got questions? We've got answers. If you don't see what you're looking for, reach out to our support team.
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/50 backdrop-blur-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/50 data-[state=open]:bg-slate-800/50 transition-all">
                    <span className="text-white font-medium text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-slate-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400">
            Still have questions? <a href="#" className="text-teal-400 hover:underline">Contact our support team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}