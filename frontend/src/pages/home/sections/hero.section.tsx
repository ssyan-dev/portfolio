import { LINKS } from '@/shared/constants'
import { Button } from '@/shared/ui'
import { Code2, FileText, Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div className='relative w-full border-b border-primary/5 bg-muted/20'>
      <div className='absolute right-0 top-0 h-125 w-125 rounded-full bg-primary/5 blur-[100px]' />

      <section className='container relative mx-auto px-6 py-20 md:px-12 lg:py-32'>
        <div className='flex flex-col items-center gap-16 lg:flex-row lg:justify-between lg:gap-24'>
          <div className='flex flex-col items-start gap-8 lg:max-w-[60%] lg:gap-12'>
            <Button
              variant='outline'
              size='sm'
              className='h-auto bg-background px-4 py-1.5 text-xs uppercase tracking-widest text-primary hover:bg-background cursor-default'
            >
              <Sparkles className='mr-2 size-4' />
              Backend Developer
            </Button>

            <div className='space-y-6'>
              <h1 className='font-heading text-6xl font-bold tracking-tighter sm:text-8xl xl:text-9xl leading-[0.9]'>
                Stanislav<span className='text-primary'>.</span>
              </h1>
              <p className='max-w-2xl text-xl font-medium leading-relaxed text-muted-foreground md:text-2xl lg:text-3xl'>
                Creating{' '}
                <span className='text-foreground bg-primary/30 px-1'>
                  high-performance
                </span>{' '}
                architecture with{' '}
                <span className='underline underline-offset-8 decoration-primary/30 text-foreground'>
                  Golang
                </span>
                .
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-6'>
              <Button size='lg' className='h-16 px-10 text-xl' asChild>
                <Link to={LINKS.resumeUrl}>
                  <FileText className='mr-3 size-6' />
                  Resume
                </Link>
              </Button>

              <div className='flex items-center gap-4'>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-16 w-16'
                  asChild
                >
                  <Link to={LINKS.githubUrl}>
                    <Code2 className='size-6' />
                  </Link>
                </Button>

                <Button
                  variant='outline'
                  size='icon'
                  className='h-16 w-16'
                  asChild
                >
                  <Link to={LINKS.telegramUrl}>
                    <Send className='size-6' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className='relative shrink-0 lg:max-w-[40%]'>
            <div className='relative h-80 w-80 overflow-hidden rounded-[4rem] border-2 border-primary/10 bg-muted shadow-2xl sm:h-96 sm:w-96 lg:h-112.5 lg:w-112.5'>
              <img
                src='/photo.jpg'
                alt='ssyan'
                className='h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0'
              />
              <div className='absolute inset-0 ring-1 ring-inset ring-primary/20 rounded-[4rem]' />
            </div>

            <div className='absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-[4rem] border-2 border-dashed border-primary/20' />
          </div>
        </div>
      </section>
    </div>
  )
}
