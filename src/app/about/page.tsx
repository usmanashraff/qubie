"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Bot, Sparkles, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Usman Ashraf",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=Usman",
    bio: "Lead developer focusing on backend architecture and AI integration",
    links: {
      github: "https://github.com/usmanashraff",
      linkedin: "https://www.linkedin.com/in/usman-ashraf-304145274/",
      email: "mailto:osmanashruf@gmail.com"
    }
  },
  {
    name: "Khansa Muzahir",
    role: "Frontend Developer",
    image: "/avatar.jpg",
    bio: "UI/UX specialist responsible for the user interface and experience design",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:khansa@example.com"
    }
  },
  {
    name: "Naila Rani",
    role: "AI/ML Engineer",
    image: "/avatar.jpg",
    bio: "Machine learning expert focusing on document processing and analysis",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:naila@example.com"
    }
  }
]

const achievements = [
  {
    icon: <Bot className="h-6 w-6 text-indigo-400" />,
    title: "AI-Powered",
    description: "Advanced machine learning models for document analysis"
  },
  {
    icon: <Sparkles className="h-6 w-6 text-teal-400" />,
    title: "Innovation",
    description: "Cutting-edge approach to document interaction"
  },
  {
    icon: <FileText className="h-6 w-6 text-purple-400" />,
    title: "Versatility",
    description: "Support for multiple document formats and types"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-20 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="rounded-full  p-1 backdrop-blur-sm">
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-indigo-500/20 dark:to-teal-500/20 backdrop-blur-sm rounded-full mb-6 border border-primary/10 dark:border-indigo-500/20">
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">
                  Final Year Project
                </span>
              </div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk mb-6 text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Revolutionizing Document Intelligence
            </motion.h1>

            <motion.p 
              className="text-slate-400 text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A cutting-edge AI project by BSIT students at University of Sargodha
            </motion.p>

            <motion.div 
              className="bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 opacity-50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className=" text-lg leading-relaxed">
                Qubie represents the intersection of artificial intelligence and practical document management. 
                Our platform transforms how users interact with their documents, making information retrieval 
                and analysis more intuitive and efficient than ever before.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 relative">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300/50 dark:hover:border-slate-600/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-medium">{achievement.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-300">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">Meet the Team</span>
              </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The talented team behind Qubie, bringing together expertise in AI, development, and design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 group-hover:border-indigo-500/50 transition-all duration-300">
                  <div className="p-8">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative rounded-xl bg-slate-100 dark:bg-slate-900 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-center mb-4">
                      {member.role}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                      {member.bio}
                    </p>
                    
                    <div className="flex justify-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-indigo-500/10"
                        asChild
                      >
                        <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-indigo-500/10"
                        asChild
                      >
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-indigo-500/10"
                        asChild
                      >
                        <a href={member.links.email}>
                          <Mail className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 relative">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl blur-xl opacity-20" />
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold font-space-grotesk mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  Project Overview
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Bachelor of Science in Information Technology</h3>
                      <p className="text-slate-400">University of Sargodha</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Final Year Project</h3>
                      <p className="text-slate-400">Regular Session</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-700/50">
                    <p className="text-slate-300 leading-relaxed">
                      This project represents the culmination of our academic journey, combining cutting-edge AI technology 
                      with practical applications in document analysis. Our goal is to revolutionize how users interact 
                      with their documents, making information retrieval and analysis more intuitive and efficient.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}