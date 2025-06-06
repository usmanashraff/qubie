"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../../src/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'


const AuthCallbackClient = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const { data, error } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });
  
  useEffect(() => {
    if (data?.success) {
      // user is synced to db
      router.push(origin ? `/${origin}` : '/dashboard');
    }
  }, [data, router, origin]);
  
  useEffect(() => {
    if (error?.data?.code === 'UNAUTHORIZED') {
      router.push('/api/auth/login');
    }
  }, [error, router]);
  

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default AuthCallbackClient