import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ask PakTurk | PakTurk Furnitures',
  description: 'Ask PakTurk Furnitures about handmade solid-wood furniture, showrooms, customization, delivery, and care.',
}

export const viewport: Viewport = { themeColor: '#2d241e', colorScheme: 'light', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
