
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LoginLink,
    RegisterLink,
    getKindeServerSession,
  } from '@kinde-oss/kinde-auth-nextjs/server'
  import { ArrowRight } from 'lucide-react'
  import UserAccountNav from './UserAccountNav'
  import {Navbar} from "@/components/Navbar";
import { ThemeToggle } from "./ThemeToggle"

export async function ParentNav() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
  return (
    <div className={cn(
      " fixed top-0 w-full z-50 transition-all duration-300", 
         "bg-background/90 backdrop-blur-md shadow-md" 
    )}>
      <div className="container flex h-16 items-center">
      <Navbar />

        
        <div className="flex-1 flex justify-end ">
          <div className="flex  gap-4">
            



            {!user ? (
              <>
                             <ThemeToggle />
                <LoginLink>
                    <Button variant="ghost" size="sm">
                        Log in
                        </Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="default" size="sm" className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400">
              Get Started {' '}
              <ArrowRight className='ml-1.5 h-5 w-5' />
            </Button>
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'>
                   <Button variant="ghost" size="sm">
                        Dashboard
                        </Button>
                </Link>
               <ThemeToggle />
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
