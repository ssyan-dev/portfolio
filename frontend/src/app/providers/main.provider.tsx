import type { ReactNode } from 'react'
import { ThemeProvider } from '.'

interface MainProviderProps {
  children: ReactNode
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      {children}
    </ThemeProvider>
  )
}
