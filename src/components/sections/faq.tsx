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
    question: "What types of documents can I upload to the platform?",
    answer: "You can upload various document formats including PDF, Word (.doc/.docx), Excel (.xls/.xlsx), and text files (.txt)."
  },
  {
    question: "How does the AI understand and answer my questions?",
    answer: "Once a document is uploaded, our system extracts the text and uses the Gemini API to analyze the content. You can then ask questions in natural language, and the AI responds with relevant information based on the content of your document."
  },
  {
    question: "What file sizes and types are supported?",
    answer: "Free plans support files up to 4MB and 200 pages per document. Pro plans extend this to 32MB and 500 pages per document. We support PDFs, Word documents (.docx), Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), and 20+ other common business file formats."
  },
  {
    question: "How does your system provide more accurate answers than others?",
    answer: "Our system uses Google Gemini 2.5 Pro, a powerful reasoning model known for its advanced capabilities in understanding and processing complex queries. This ensures higher accuracy, better context understanding, and more reliable answers compared to standard models."
  },
  {
    question: "Can your system process images inside documents?",
    answer: "Yes, our system is capable of detecting and understanding images embedded in documents. However, this feature is currently in the staging environment and is not yet available in the public release."
  },
 
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 relative bg-background">
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
              QUESTIONS & ANSWERS
            </span>
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground dark:text-slate-400 text-lg"
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
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border border-border dark:border-slate-800 rounded-lg overflow-hidden bg-gradient-to-br from-card/80 to-muted/80 dark:from-slate-900/50 dark:to-slate-900/50 backdrop-blur-sm"
                >
                  <AccordionTrigger 
                    className="px-6 py-4 hover:no-underline hover:bg-muted/50 dark:hover:bg-slate-800/50 data-[state=open]:bg-muted/50 dark:data-[state=open]:bg-slate-800/50 transition-all"
                  >
                    <span className="text-foreground dark:text-white font-medium text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-muted-foreground dark:text-slate-300">
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
          <p className="text-muted-foreground dark:text-slate-400">
            Still have questions? <a href="#" className="text-primary dark:text-teal-400 hover:underline">Contact our support team</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}