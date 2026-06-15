import { Button } from '@/shared/ui'
import { Briefcase, Code2, Cpu, GraduationCap, Terminal } from 'lucide-react'

export const AboutSection = () => {
  return (
    <section
      id='about'
      className='container mx-auto px-6 py-12 md:px-12 md:py-24'
    >
      <div className='grid gap-16 lg:grid-cols-2 lg:gap-32'>
        <div className='space-y-8 md:space-y-12'>
          <div className='space-y-4 md:space-y-6'>
            <h2 className='font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
              Someone <span className='text-primary'>about me</span>.
            </h2>
            <div className='space-y-6 text-xl leading-relaxed text-muted-foreground md:text-2xl'>
              <p>
                My story began{' '}
                <span className='underline underline-offset-8 decoration-primary/30 text-foreground px-1'>
                  at 11
                </span>
                , i was just interested how laptops, games and apps worked. That
                early drive to "take things apart" eventually led me into
                Network and System Administration, where I gained a deep
                understanding of infrastructure and how software interacts with
                hardware.
              </p>
              <p>
                Today, I'm building apps with{' '}
                <span className='underline underline-offset-8 decoration-primary/30 text-foreground'>
                  Go
                </span>{' '}
                and{' '}
                <span className='underline underline-offset-8 decoration-primary/30 text-foreground'>
                  React
                </span>
                . I architect solutions that stand up to pressure and stay
                maintainable for the long haul.
              </p>
            </div>
          </div>

          <div className='flex flex-wrap gap-x-12 gap-y-6 pt-4'>
            <div className='space-y-1'>
              <p className='text-sm font-bold uppercase tracking-widest text-primary'>
                Experience
              </p>
              <div className='flex items-center gap-3'>
                <Briefcase className='size-6 text-muted-foreground' />
                <p className='text-3xl font-bold font-heading'>5+ Years</p>
              </div>
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-bold uppercase tracking-widest text-primary'>
                Education
              </p>
              <div className='flex items-center gap-2'>
                <GraduationCap className='size-5 text-muted-foreground' />
                <p className='text-xl font-bold'>
                  Network and System Administration
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-12 pt-8 lg:pt-0'>
          <div className='group space-y-4'>
            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                size='icon'
                className='size-12 rounded-full p-0 transition-colors group-hover:bg-primary/5 pointer-events-none'
              >
                <Code2 className='size-6 text-primary' />
              </Button>
              <h3 className='font-heading text-2xl font-bold'>Frontend</h3>
            </div>
            <p className='text-lg text-muted-foreground'>
              React, TypeScript, Next.js, TailwindCSS, shadcn/ui,
              react-hook-form, zod
            </p>
          </div>

          <div className='group space-y-4 text-right lg:text-left'>
            <div className='flex items-center gap-4 justify-end lg:justify-start'>
              <Button
                variant='outline'
                size='icon'
                className='size-12 rounded-full p-0 transition-colors group-hover:bg-primary/5 order-last lg:order-first pointer-events-none'
              >
                <Terminal className='size-6 text-primary' />
              </Button>
              <h3 className='font-heading text-2xl font-bold'>Backend</h3>
            </div>
            <p className='text-lg text-muted-foreground'>
              Go (Fiber), Node.js (Nest.js), PostgreSQL, Redis, RabbitMQ, Prisma
              ORM, gRPC, WebSocket, JWT, OAuth2
            </p>
          </div>

          <div className='group space-y-4'>
            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                size='icon'
                className='size-12 rounded-full p-0 transition-colors group-hover:bg-primary/5 pointer-events-none'
              >
                <Cpu className='size-6 text-primary' />
              </Button>
              <h3 className='font-heading text-2xl font-bold'>DevOps</h3>
            </div>
            <p className='text-lg text-muted-foreground'>Linux, Docker, Git</p>
          </div>
        </div>
      </div>
    </section>
  )
}
