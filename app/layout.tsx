import { ThemeProvider } from "@/components/ThemeProvider";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import Navbar from "@/components/ui/navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kevin Sclafani Portfolio",
  description: "Portfolio for QuietGhost",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Kevin Sclafani Portfolio",
    description: "Portfolio for QuietGhost",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider>
          <PerformanceMonitor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
