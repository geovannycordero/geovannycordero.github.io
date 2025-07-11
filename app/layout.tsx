import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://geovannycordero.com"),
  title: {
    default: "Geovanny Cordero Valverde - Full-Stack Software Engineer",
    template: "%s - Geovanny Cordero Valverde",
  },
  description:
    "Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies. Based in San José, Costa Rica.",
  keywords:
    "Full-Stack Developer, Software Engineer, Golang, Ruby on Rails, JavaScript, Vue.js, React, Costa Rica, Web Development, Backend Development, Frontend Development",
  authors: [{ name: "Geovanny Cordero Valverde" }],
  creator: "Geovanny Cordero Valverde",
  publisher: "Geovanny Cordero Valverde",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://geovannycordero.com",
    title: "Geovanny Cordero Valverde - Full-Stack Software Engineer",
    description:
      "Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.",
    siteName: "Geovanny Cordero Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geovanny Cordero Valverde - Full-Stack Software Engineer",
    description:
      "Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://geovannycordero.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Geovanny Cordero Valverde - Blog RSS Feed"
          href="/rss.xml"
        />
        <meta name="theme-color" content="#059669" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Geovanny Cordero Valverde",
              jobTitle: "Full-Stack Software Engineer",
              description:
                "Passionate Full-Stack Software Engineer with 5+ years of experience, specializing in Golang, Ruby on Rails, and JavaScript technologies.",
              url: "https://geovannycordero.com",
              email: "geovanny@pm.me",
              telephone: "+506 8852 7576",
              address: {
                "@type": "PostalAddress",
                addressLocality: "San José",
                addressCountry: "Costa Rica",
              },
              sameAs: ["https://linkedin.com/in/geovannycordero"],
              knowsAbout: [
                "Golang",
                "Ruby on Rails",
                "JavaScript",
                "Vue.js",
                "Full-Stack Development",
                "Team Leadership",
                "Software Engineering",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
