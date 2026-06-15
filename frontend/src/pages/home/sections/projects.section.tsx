import { Button } from '@/shared/ui'
import { Code2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ProjectsSection = () => {
  const projects: {
    id: string
    title: string
    description: string
    imageUrl?: string
    projectUrl?: string
    githubUrl?: string
    stack: string[]
  }[] = [
    {
      id: '1',
      title: 'upXP (ArenaMMO)',
      description:
        'Backend development of a Brazilian gaming marketplace like to G2G or FunPay. Secure server-side logic, integrated payment gateways, and managed real-time data synchronisation.',
      imageUrl: '/projects/upxp/upxp_games.png',
      projectUrl: 'https://upxp.com.br',
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
      id: '2',
      title: 'topoisk.ru',
      description:
        'A specialized search platform designed for high-speed indexing and precise data retrieval. Focused on architectural scalability and efficient search algorithms.',
      imageUrl: '/projects/topoisk_old.png',
      stack: ['Go', 'Elasticsearch', 'React', 'TypeScript'],
    },
    {
      id: '3',
      title: 'Kavkaz House Rental',
      description: "Just a free work for review. PROJECT AREN'T REAL!",
      imageUrl: '/projects/kavkaz/home_carousel1.jpg',
      stack: ['React', 'TailwindCSS', 'shadcn/ui'],
    },
    {
      id: '4',
      title: 'MADE Project',
      description:
        'Managed server infrastructure. Developed custom C# plugins and Unity-based UI systems for game logic management. 60-80 online everyday.',
      imageUrl: '/projects/madeunt.jpg',
      projectUrl: 'https://vk.com/madeunt',
      stack: ['C#', 'PostgreSQL', 'Unity', 'Node.js', 'discord.js'],
    },
  ]

  const projectsVisibleAmount = 4

  return (
    <section id='projects' className='container mx-auto px-6 md:px-12'>
      <div className='space-y-16 md:space-y-24'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-4'>
            <h2 className='font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
              Featured <span className='text-primary'>works</span>.
            </h2>
          </div>
        </div>

        <div className='grid gap-12 md:gap-24'>
          {projects.slice(0, projectsVisibleAmount).map(p => (
            <div
              key={p.id}
              className='group grid gap-8 lg:grid-cols-2 lg:items-center'
            >
              <div className='relative aspect-video overflow-hidden rounded-[2rem] bg-muted/50 transition-colors group-hover:bg-muted'>
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                ) : (
                  <div className='flex h-full items-center justify-center text-muted-foreground/30'>
                    <span className='font-heading text-2xl font-bold uppercase tracking-widest'>
                      {p.title}
                    </span>
                  </div>
                )}
              </div>
              <div className='space-y-6 md:space-y-8'>
                <div className='space-y-4'>
                  <h3 className='font-heading text-3xl font-bold sm:text-4xl md:text-5xl'>
                    {p.title}
                  </h3>
                  <p className='text-xl text-muted-foreground leading-relaxed'>
                    {p.description}
                  </p>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {p.stack.map(s => (
                    <span
                      key={s}
                      className='rounded-full border border-primary/10 bg-background px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary'
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className='flex gap-4'>
                  {p.githubUrl && (
                    <Button
                      variant='outline'
                      className='h-12 px-6 uppercase tracking-widest rounded-full font-bold'
                      asChild
                    >
                      <Link to={p.githubUrl}>
                        <Code2 className='mr-2 size-5' /> Source
                      </Link>
                    </Button>
                  )}
                  {p.projectUrl && (
                    <Button
                      className='h-12 px-6 uppercase tracking-widest rounded-full font-bold'
                      asChild
                    >
                      <Link to={p.projectUrl}>
                        <ExternalLink className='mr-2 size-5' /> Visit
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
