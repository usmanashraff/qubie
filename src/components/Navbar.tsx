"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Monitor, Bot, Sparkles, Users } from "lucide-react"

export function Navbar() {

  
  return (
    
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className="flex items-center space-x-2 mr-6">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-space-grotesk font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">Qubie</span>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-slate-800 to-slate-900 p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Sparkles className="h-6 w-6 text-teal-400" />
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          AI-Powered
                        </div>
                        <p className="text-sm leading-tight text-white/70">
                          Interact with your documents using advanced AI technology
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/#features" title="Universal Compatibility" icon={<Monitor className="h-4 w-4 text-teal-400 mr-2" />}>
                    Support for PDFs, spreadsheets and 20+ formats
                  </ListItem>
                  <ListItem href="/#features" title="Smart Citations" icon={<Sparkles className="h-4 w-4 text-teal-400 mr-2" />}>
                    AI highlights exact sources from your documents
                  </ListItem>
                  <ListItem href="/#features" title="Multi-Documents Support" icon={<Users className="h-4 w-4 text-teal-400 mr-2" />}>
                  Qubie supports querying across up to 10 documents simultaneously** for deeper insights.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/#pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/#faq" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  FAQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode
  }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"