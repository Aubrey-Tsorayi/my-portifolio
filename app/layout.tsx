import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./ui/Sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tutsirayi Aubrey Tsorayi",
  description: "Tutsirayi Aubrey Tsorayi's personal blog and portfolio",
  icons: {
    icon: '/imgs/logo.png',
    shortcut: '/imgs/logo.png',
    apple: '/imgs/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative h-full min-h-screen w-full flex flex-1">
          <div className="w-[300px]">
          <SpeedInsights/>
            <Sidebar />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
