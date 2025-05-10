"use client"

import React from "react"
import Link from "next/link"
import { Bot, Twitter, Linkedin, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-border dark:border-slate-900">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary dark:text-indigo-400" />
            <span className="font-space-grotesk font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 dark:from-indigo-400 dark:to-teal-400">
              Qubie
            </span>
          </Link>

          {/* Social Links */}
          <div className="flex space-x-4">
            <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
            <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
            <SocialLink href="#" icon={<Github className="h-5 w-5" />} />
            <SocialLink href="#" icon={<Mail className="h-5 w-5" />} />
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground dark:text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Qubie AI. All rights reserved.
          </p>
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