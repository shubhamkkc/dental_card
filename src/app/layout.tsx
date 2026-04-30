import type { Metadata } from 'next'
import { DM_Serif_Display, Barlow } from 'next/font/google'
import './globals.css'

const dmSerif = DM_Serif_Display({ 
  weight: '400', 
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif'
})

const barlow = Barlow({ 
  weight: ['400', '500', '600', '700', '800'], 
  subsets: ['latin'],
  variable: '--font-barlow'
})

export const metadata: Metadata = {
  title: 'Digital Dental Lab PVC Card Printer',
  description: 'Certified Warranty Card Printer for Digital Dental Lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${barlow.variable}`}>
      <body className="font-sans font-barlow">{children}</body>
    </html>
  )
}
