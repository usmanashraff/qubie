"use client"

import React, { useState } from "react"
import { motion } from "@/lib/motion"
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
const testimonials = [
  {
    quote: "Qubie cut our contract review time by 70%—it's like having a PhD on standby. The ability to ask questions across multiple documents has transformed our legal review process.",
    author: "Sarah Johnson",
    title: "CTO, TechCorp",
    avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Sarah",
    rating: 5
  },
  {
    quote: "The contextual understanding is miles ahead of other tools we've tried. We can ask complex questions about financial documents and get accurate, sourced answers immediately.",
    author: "David Chen",
    title: "Head of Finance, Innovate Inc",
    avatar: "https://api.dicebear.com/7.x/micah/svg?seed=David",
    rating: 5
  },
  {
    quote: "Our research team processes hundreds of academic papers monthly. Qubie's ability to cross-reference information across multiple documents has been a game-changer for our literature reviews.",
    author: "Elena Rodriguez",
    title: "Research Director, BioSolutions",
    avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Elena",
    rating: 5
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <section className="py-24 relative bg-background">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border dark:via-slate-700/50 to-transparent" />
      
      {/* Geometric background pattern */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent,transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent,transparent)]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 border border-primary/20 dark:border-indigo-500/20 rounded-full opacity-20" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 border border-teal-500/20 rounded-full opacity-20" />
      </div>

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
              SUCCESS STORIES
            </span>
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground dark:text-slate-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hear from professionals who have transformed their document workflows with Qubie.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial carousel */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-center mt-8 gap-2">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="icon"
                className="rounded-full border-border bg-card/50 text-foreground hover:bg-muted dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {testimonials.map((_, idx) => (
                <Button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-2 h-2 p-0 rounded-full",
                    idx === currentIndex 
                      ? "bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400" 
                      : "bg-muted hover:bg-muted/80 dark:bg-slate-700 dark:hover:bg-slate-600"
                  )}
                />
              ))}
              
              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="icon"
                className="rounded-full border-border bg-card/50 text-foreground hover:bg-muted dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div 
      className={cn(
        "bg-gradient-to-br from-card/90 to-muted/90 dark:from-slate-800/80 dark:to-slate-900/80",
        "backdrop-blur-sm rounded-xl p-8",
        "border border-border dark:border-slate-700/50",
        "relative overflow-hidden"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Card background effects */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          "bg-gradient-to-br from-primary/30 via-transparent to-teal-500/30 dark:from-indigo-500/30 dark:via-transparent dark:to-teal-500/30"
        )} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="flex mr-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-primary dark:text-yellow-400 fill-primary dark:fill-yellow-400" />
            ))}
          </div>
        </div>
        
        <blockquote className="text-foreground dark:text-white text-lg leading-relaxed italic mb-8">
          "{testimonial.quote}"
        </blockquote>
        
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image
              width={48}
              height={48}
              src={testimonial.avatar} 
              alt={testimonial.author}
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <p className="text-foreground dark:text-white font-medium">{testimonial.author}</p>
            <p className="text-muted-foreground dark:text-slate-400">{testimonial.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}