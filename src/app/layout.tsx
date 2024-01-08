import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../assets/globals.css'
import {AuthContextProvider} from '@/context/AppContext'
import UiHeader from "@/components/UiHeader";
import {ReactNode} from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'My Grocery List',
  description: 'Simplest way manage your grocery list.',
}

export default function RootLayout({children}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@500;700&display=swap" rel="stylesheet"/>
    </head>
    <body className={inter.className}>
    <AuthContextProvider>
      <div className='min-h-screen flex flex-col'>
        <UiHeader/>
        <main className='flex-1'>
          {children}
        </main>
        <footer
          className="flex justify-center bg-white py-10 text-sm">
          My Market List - Made with ❤ in Amsterdam
        </footer>
      </div>
    </AuthContextProvider>
    </body>
    </html>
  )
}
