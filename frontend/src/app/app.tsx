import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { Header } from '@/widgets/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainProvider } from './providers/main.provider'

export const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <div className='relative flex min-h-screen flex-col overflow-x-hidden'>
          <Header />
          <main className='py-8 flex-1'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </MainProvider>
  )
}
