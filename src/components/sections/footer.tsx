"use client"

import React from "react"
import Link from "next/link"
import { Bot, Twitter, Linkedin, Github, Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-border dark:border-slate-900 relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Bot className="h-6 w-6 text-primary dark:text-indigo-400" />
              <span className="font-space-grotesk font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">
                Qubie
              </span>
            </Link>
            <p className="text-muted-foreground dark:text-slate-400 mb-6">
              Revolutionize how you interact with documents powered by AI.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Github className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Mail className="h-5 w-5" />} />
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-space-grotesk font-bold text-foreground dark:text-white mb-6">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#" newTab>Enterprise</FooterLink>
              <FooterLink href="#" newTab>API Documentation</FooterLink>
              <FooterLink href="#" newTab>Release Notes</FooterLink>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-space-grotesk font-bold text-foreground dark:text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="#" newTab>About Us</FooterLink>
              <FooterLink href="#" newTab>Careers</FooterLink>
              <FooterLink href="#" newTab>Blog</FooterLink>
              <FooterLink href="#" newTab>Press</FooterLink>
              <FooterLink href="#" newTab>Contact</FooterLink>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-space-grotesk font-bold text-foreground dark:text-white mb-6">Get AI Insights Weekly</h3>
            <p className="text-muted-foreground dark:text-slate-400 mb-4">
              Stay updated with the latest in AI document processing.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-card/50 dark:bg-slate-800/50 border-border dark:border-slate-700/50 placeholder:text-muted-foreground dark:placeholder:text-slate-500 text-foreground dark:text-white"
              />
              <Button className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 dark:from-indigo-600 dark:to-teal-500 dark:hover:from-indigo-500 dark:hover:to-teal-400 text-primary-foreground">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border dark:border-slate-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground dark:text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Qubie AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-white text-sm">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="w-9 h-9 rounded-full flex items-center justify-center bg-card/50 dark:bg-slate-800/50 text-muted-foreground dark:text-slate-400 hover:bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-600 dark:to-teal-500 hover:text-primary-foreground transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children, newTab }: { href: string, children: React.ReactNode, newTab?: boolean }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-white transition-colors"
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    </li>
  )
}