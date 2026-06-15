import { Button } from '@/shared/ui'
import { Briefcase, Calendar, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPERIENCES: {
  company: string
  position: string
  period: string
  url?: string
  description: string
  stack: string[]
}[] = [
  {
    company: 'danceradar',
    position: 'Owner, Go/TypeScript Developer',
    period: 'Jun 2026 - Present',
    url: 'https://danceradar.ru',
    description:
      'Developing a platform designed to the discovery and organization of dance events. Currently doing infrastructure (currently in development)',
    stack: [
      'Go',
      'Fiber',
      'PostgreSQL',
      'Redis',
      'TypeScript',
      'Next.js',
      'TailwindCSS',
      'shadcn/ui',
      'Docker',
    ],
  },
  {
    company: 'ArenaMMO (upXP)',
    position: 'Node.js Developer',
    period: 'Feb 2024 - March 2025',
    url: 'https://upxp.com.br',
    description:
      'Backend development of a Brazilian gaming marketplace like to G2G or FunPay. Secure server-side logic, integrated payment gateways, and managed real-time data synchronisation.',
    stack: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'Redis',
      'Session Auth',
      'WebSocket',
      'discord.js',
      'Trio API (payments)',
    ],
  },
  {
    company: 'MADE Project',
    position: 'Owner, C#/.NET Developer',
    period: 'May 2020 - Aug 2020',
    description:
      'Managed server infrastructure. Developed custom C# plugins and Unity-based UI systems for game logic management. 60-80 online everyday.',
    stack: ['C#', 'PostgreSQL', 'Unity', 'Node.js', 'discord.js'],
  },
]

export const ExperienceSection = () => {
  return (
    <section id='experience' className='container mx-auto px-6 md:px-12'>
      <div className='flex flex-col gap-16 md:gap-24'>
        <div className='space-y-4'>
          <h2 className='font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
            All my long-work <span className='text-primary'>experience</span>.
          </h2>
        </div>

        <div className='grid gap-12'>
          {EXPERIENCES.map((e, idx) => (
            <div
              key={idx}
              className='group relative grid gap-8 rounded-[2rem] border border-primary/5 bg-muted/20 p-8 transition-colors hover:bg-muted/30 md:grid-cols-[1fr_2fr] md:p-12'
            >
              <div className='flex flex-col items-start space-y-6'>
                <div className='flex items-center gap-4'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='size-12 shrink-0 rounded-full p-0 pointer-events-none'
                  >
                    <Briefcase className='size-6 text-primary' />
                  </Button>
                  <div className='space-y-1'>
                    <h3 className='font-heading text-2xl font-bold'>
                      {e.company}
                    </h3>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Calendar className='size-4' />
                      <span className='text-xs font-bold uppercase tracking-widest'>
                        {e.period}
                      </span>
                    </div>
                  </div>
                </div>

                {e.url && (
                  <Button
                    className='h-12 px-6 uppercase tracking-widest rounded-full font-bold transition-all hover:scale-105 active:scale-95'
                    asChild
                  >
                    <Link to={e.url} target='_blank' rel='noreferrer'>
                      <ExternalLink className='mr-2 size-5' />
                      Visit
                    </Link>
                  </Button>
                )}
              </div>

              <div className='space-y-6'>
                <div className='space-y-3'>
                  <h4 className='text-xl font-bold text-foreground md:text-2xl'>
                    {e.position}
                  </h4>
                  <p className='text-lg leading-relaxed text-muted-foreground'>
                    {e.description}
                  </p>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {e.stack.map(t => (
                    <span
                      key={t}
                      className='rounded-full border border-primary/10 bg-background px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary'
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
