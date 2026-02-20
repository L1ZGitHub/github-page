import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SchemaOrg } from "@/components/schema"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Hélain Zimmermann | AI Engineer & CTO",
    template: "%s | Hélain Zimmermann",
  },
  description:
    "Co-Founder & CTO at Ailog. AI Engineer specializing in RAG systems, privacy-preserving NLP, and machine learning. ENSIMAG & KTH ML Master.",
  metadataBase: new URL("https://helain-zimmermann.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helain-zimmermann.com",
    siteName: "Hélain Zimmermann",
    title: "Hélain Zimmermann | AI Engineer & CTO",
    description:
      "Co-Founder & CTO at Ailog. AI Engineer specializing in RAG systems, privacy-preserving NLP, and machine learning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hélain Zimmermann | AI Engineer & CTO",
    description:
      "Co-Founder & CTO at Ailog. AI Engineer specializing in RAG systems, privacy-preserving NLP, and machine learning.",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://helain-zimmermann.com/feed.xml",
    },
  },
  verification: {
    google: "fGxd4XLuu53IV4fPu1-xY_2JZTB7hBs5gAmyES6v-b0",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <SchemaOrg />
      </body>
    </html>
  )
}
