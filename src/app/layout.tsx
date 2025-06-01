import { metadata } from "@/base/meta/Metadata";

export { metadata };

import { Geist, Geist_Mono } from "next/font/google";

metadata.manifest = "/manifest.json";

import "./globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { ThemeProvider } from "@/utils/context/ThemaContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          storageKey="theme"
        >
          <Providers>
            <Pathname>
              {children}
            </Pathname>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
