import '../styles/globals.css'

export const metadata = {
  title: 'Lifeline - Blood Donor Platform | Donate Blood, Save Lives',
  description: 'Connect hospitals with nearby donors in seconds. Join our mission to make blood donation faster, easier, and more impactful than ever before.',
  keywords: 'blood donation, donate blood, blood donor, hospital, emergency, save lives, blood bank',
  authors: [{ name: 'Lifeline Blood Donor Platform' }],
  
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    url: 'https://lifeline.org/',
    title: 'Lifeline - Blood Donor Platform | Donate Blood, Save Lives',
    description: 'Connect hospitals with nearby donors in seconds. Join our mission to make blood donation faster, easier, and more impactful.',
    images: ['/og-image.jpg'],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    url: 'https://lifeline.org/',
    title: 'Lifeline - Blood Donor Platform | Donate Blood, Save Lives',
    description: 'Connect hospitals with nearby donors in seconds. Join our mission to make blood donation faster, easier, and more impactful.',
    images: ['/twitter-image.jpg'],
  },

  // Icons and manifest
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',

  // Other meta tags
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
} 