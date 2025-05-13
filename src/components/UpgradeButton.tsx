"use client"

import { Button } from './ui/button'
import { trpc } from '@/app/_trpc/client'
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"


const UpgradeButton = () => {

  const {mutate: createStripeSession} = trpc.createStripeSession.useMutation({
    onSuccess: ({url}) => {
      window.location.href = url ?? "/dashboard/billing"
    }
  })

  return (
    <Button onClick={() => createStripeSession()} className={cn(
                "w-full rounded-lg",
                   "bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 dark:from-indigo-600 dark:to-teal-500 dark:hover:from-indigo-500 dark:hover:to-teal-400 text-primary-foreground"
                  //  "bg-card hover:bg-muted dark:bg-slate-800 dark:hover:bg-slate-700 text-foreground dark:text-white"
              )}>
      Upgrade now <ChevronRight className="ml-1 h-4 w-4" />
    </Button>
  )
}

export default UpgradeButton