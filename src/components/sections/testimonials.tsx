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
    <section className="py-24 relative">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60 z-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent,transparent)]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 border border-indigo-500/20 rounded-full opacity-20" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 border border-teal-500/20 rounded-full opacity-20" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            SUCCESS STORIES
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg"
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
                className="rounded-full border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
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
                      ? "bg-teal-400" 
                      : "bg-slate-700 hover:bg-slate-600"
                  )}
                />
              ))}
              
              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="icon"
                className="rounded-full border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Video testimonial preview */}
          <motion.div 
            className="mt-16 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-teal-400 font-medium mb-3">FEATURED STORY</span>
                <h3 className="text-2xl font-bold font-space-grotesk mb-4 text-white">
                  How NextLevel Research Streamlined Their Document Analysis
                </h3>
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">5.0 rating</span>
                </div>
                <p className="text-slate-300 italic mb-6">
                  "Qubie transformed our research processes completely. What used to take days now takes minutes, and the quality of insights has improved dramatically."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://api.dicebear.com/7.x/micah/svg?seed=Michael" 
                      alt="Michael Parker"
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Michael Parker</p>
                    <p className="text-slate-400 text-sm">Head of Research, NextLevel</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent" />
                  <Image 
                   width={1280}
                   height={720}
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      className="w-16 h-16 rounded-full bg-teal-500 hover:bg-teal-400 text-white"
                      variant="default"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-6">
        <div className="flex mr-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
      
      <blockquote className="text-white text-lg leading-relaxed italic mb-8">
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
          <p className="text-white font-medium">{testimonial.author}</p>
          <p className="text-slate-400">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  )
}