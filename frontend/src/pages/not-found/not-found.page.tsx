import { Button } from '@/shared/ui'
import { MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className='flex h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden px-6 text-center'>
      <div className='relative flex w-full flex-col items-center gap-8 md:gap-12'>
        <h1 className='font-heading text-7xl font-black leading-none tracking-tighter text-muted-foreground/10 sm:text-[15rem] md:text-[20rem] lg:text-[25rem] select-none'>
          404
        </h1>

        <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6'>
          <h2 className='font-heading text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
            Page <span className='text-primary'>Not Found</span>
          </h2>
          <p className='max-w-125 text-lg text-muted-foreground sm:text-xl md:text-2xl'>
            Sorry, this page doesn't exist.
          </p>
          <div className='mt-4 sm:mt-8'>
            <Button
              size='lg'
              className='h-14 rounded-full px-10 text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95'
              asChild
            >
              <Link to='/'>
                <MoveLeft className='mr-3 size-5' />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
