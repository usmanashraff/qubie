
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from "@/components/ui/sonner";
import 'simplebar-react/dist/simplebar.min.css';
import { Providerss } from './providers'
import { ParentNav } from "@/components/ParentNav";


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
  title: "Qubie: chat with docs",
  description: "chat with yours documents using ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <Providers>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providerss>
        {/* <Navbar /> */}
        <Toaster />
        <ParentNav />
        {children}
        </Providerss>
      </body>
      </Providers>
    </html>

  );
}
