import type { ReactNode } from 'react'

interface MainProviderProps {
  children: ReactNode
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return <>{children}</>
}
