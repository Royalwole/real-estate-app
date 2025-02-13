import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Real Estate Listings',
  description: 'Find your dream property with our extensive listings and professional service',
  keywords: 'real estate, property, houses, apartments, condos, real estate listings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full`}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
