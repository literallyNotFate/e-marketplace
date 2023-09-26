import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './components/layout/Footer'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import AuthContext from '../../lib/context/AuthContext'
import NavbarStatic from './components/layout/NavbarStatic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home | E-Marketplace',
  description: 'Home page for E-Marketplace',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.variable}>
            <AuthContext>
                <Toaster/>

                <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-green-50" />

                <Suspense fallback="...">
                    <NavbarStatic/>
                </Suspense>

                <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
                    {children}
                </main>

                <Footer />
            </AuthContext>
        </body>
    </html>
  )
}
