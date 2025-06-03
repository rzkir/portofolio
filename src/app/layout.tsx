import { metadata } from "@/base/meta/Metadata";

export { metadata };

metadata.manifest = "/manifest.json";

import "@/base/styling/globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { ThemeProvider } from "@/utils/context/ThemaContext"

import { geistSans, geistMono } from "@/base/fonts/Fonts";

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
