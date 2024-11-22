import './globals.css'

export const metadata = {
  title: 'Innovation Terminal',
  description: 'Exploring the intersection of code and creativity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
