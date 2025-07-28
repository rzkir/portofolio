import { metadata } from "@/base/meta/Metadata";

export { metadata };

metadata.manifest = "/manifest.json";

import "@/base/styling/globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { ThemeProvider } from "@/utils/context/ThemaContext"

import { LoadingProvider } from "@/utils/context/LoadingContext"

import LoadingOverlayWrapper from "@/base/Loading/LoadingOverlayWrapper"

import { geistSans, geistMono } from "@/base/fonts/Fonts";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

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
          <LoadingProvider>
            <Providers>
              <Pathname>
                {children}
              </Pathname>
            </Providers>
            <LoadingOverlayWrapper />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
