import { Button } from '@/shared/ui'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet'
import { Menu } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './theme-switcher'

const NAV_LINKS: { label: string; href: string }[] = [
  // { label: 'about me', href: '/#about' },
  // { label: 'projects', href: '/#projects' },
  // { label: 'contact', href: '/#contact' },
  // { label: 'blog', href: '/blog' },
]

const Name = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => (
  <Link to='/' onClick={() => setIsOpen(false)}>
    <h1 className='text-xl font-bold tracking-tighter'>
      ssyan<span className='animate-pulse text-primary'>.</span>
    </h1>
  </Link>
)

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-14 items-center justify-between px-4 sm:px-8'>
        <Name setIsOpen={setIsOpen} />

        <div className='flex items-center gap-4'>
          <nav className='hidden items-center gap-1 sm:flex'>
            {NAV_LINKS &&
              NAV_LINKS.map(link => (
                <Button
                  key={link.href}
                  variant='link'
                  asChild
                  className='uppercase tracking-widest'
                >
                  <Link to={link.href}>{link.label}</Link>
                </Button>
              ))}
          </nav>

          <ModeToggle />

          <div className='sm:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='size-5' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='flex flex-col gap-4 pr-0'>
                <SheetHeader className='px-7 text-left'>
                  <SheetTitle>
                    <Name setIsOpen={setIsOpen} />
                  </SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col gap-2 px-4'>
                  {NAV_LINKS.map(link => (
                    <Button
                      key={link.href}
                      variant='ghost'
                      asChild
                      className='justify-start text-base uppercase tracking-widest'
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
