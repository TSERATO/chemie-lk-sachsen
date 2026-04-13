import { RootProvider } from 'fumadocs-ui/provider/next'
import type { ReactNode } from 'react'
import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata = {
  title: {
    default: 'LK Chemie Sachsen 12',
    template: '%s | LK Chemie Sachsen 12',
  },
  description:
    'Lernseite für den Leistungskurs Chemie am Gymnasium in Sachsen, Klasse 12.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
