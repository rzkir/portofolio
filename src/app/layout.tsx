import { metadata } from "@/base/meta/Metadata";

export { metadata };

metadata.manifest = "/manifest.json";

import "@/base/styling/globals.css";

import { ThemeProvider } from "@/context/ThemaContext"

import { LoadingProvider } from "@/context/LoadingContext"

import LoadingOverlayWrapper from "@/base/Loading/LoadingOverlayWrapper"

import { geistSans, geistMono } from "@/base/fonts/Fonts";

import Header from "@/components/layout/header/Header";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

import LenisProvider from '@/base/smooth-scroll/LenisProvider'

import Footer from "@/components/layout/footer/Footer"

import Overlay from "@/base/helper/Overlay";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          storageKey="theme"
        >
          <LenisProvider>
            <LoadingProvider>
              <Header />
              {children}
              <Footer />
              <LoadingOverlayWrapper />
              <Overlay />
            </LoadingProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
