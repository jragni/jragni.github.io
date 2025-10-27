import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jhensen Ray Agni's Portfolio",
  description: "Portfolio bio page for jhensen ray agni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-navy text-slate`}
      >
      <a
        className="absolute left-0 top-1 block -translate-x-full rounded bg-gradient-to-br bg-navy px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
        href="#main-content"
      >
        Skip to main content
      </a>
        {children}
      </body>
    </html>
  );
}
