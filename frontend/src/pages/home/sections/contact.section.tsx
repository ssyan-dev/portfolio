import { LINKS } from '@/shared/constants'
import { Button } from '@/shared/ui'
import { Mail, SendHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ContactSection = () => {
  return (
    <section
      id='contact'
      className='container mx-auto px-6 py-24 md:px-12 md:py-32'
    >
      <div className='flex flex-col items-center gap-12 text-center'>
        <div className='space-y-6'>
          <h2 className='font-heading text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl'>
            Let's <span className='text-primary'>connect</span>.
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl'>
            Have an idea for a project? I'm always open to new suggestions and
            interesting experience.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-6'>
          <Button size='lg' className='h-20 px-12 text-2xl' asChild>
            <Link to={LINKS.emailUrl}>
              <Mail className='mr-4 size-8' />
              Email
            </Link>
          </Button>

          <Button
            size='lg'
            variant='outline'
            className='h-20 px-12 text-2xl'
            asChild
          >
            <Link to={LINKS.telegramUrl} target='_blank' rel='noreferrer'>
              <SendHorizontal className='mr-4 size-8' />
              Telegram
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
