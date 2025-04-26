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
import { Monitor, Bot, Sparkles, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Desktop Navigation */}
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

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Bot className="h-6 w-6 text-primary" />
                  <span className="font-space-grotesk font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
                    Qubie
                  </span>
                </Link>
              </div>

              <div className=" flex-col space-y-2 ">
                {/* Features Dropdown */}
                <div className=" flex-col space-y-2 hidden md:flex" >
                  <Link
                    href="#"
                    className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}
                    onClick={(e) => e.preventDefault()}
                  >
                    Features
                  </Link>
                  <div className="ml-4 flex flex-col space-y-2">
                    <MobileListItem href="/#features" title="Universal Compatibility" icon={<Monitor className="h-4 w-4 text-teal-400 mr-2" />}>
                      Support for PDFs, spreadsheets and 20+ formats
                    </MobileListItem>
                    <MobileListItem href="/#features" title="Smart Citations" icon={<Sparkles className="h-4 w-4 text-teal-400 mr-2" />}>
                      AI highlights exact sources from your documents
                    </MobileListItem>
                    <MobileListItem href="/#features" title="Multi-Documents Support" icon={<Users className="h-4 w-4 text-teal-400 mr-2" />}>
                      Qubie supports querying across up to 10 documents simultaneously
                    </MobileListItem>
                  </div>
                </div>

                <Link
                  href="/#pricing"
                  className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>

                <Link
                  href="/#faq"
                  className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

// Update the MobileListItem component props
const MobileListItem = React.forwardRef<
  React.ElementRef<typeof Link>,  // Change from "a" to typeof Link
  React.ComponentPropsWithoutRef<typeof Link> & {  // Use Link's props
    icon?: React.ReactNode
    title: string
  }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        "flex flex-col p-2 rounded-md hover:bg-accent transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex items-center text-sm font-medium">
        {icon}
        {title}
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        {children}
      </p>
    </Link>
  )
})
MobileListItem.displayName = "MobileListItem"






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