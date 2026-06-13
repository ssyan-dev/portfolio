import { HomePage } from '@/pages/home'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainProvider } from './providers/main.provider'

export const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <div className='relative flex min-h-screen flex-col'>
          <Header />
          <main className='py-8 flex-1'>
            <Routes>
              <Route path='/' element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MainProvider>
  )
}
