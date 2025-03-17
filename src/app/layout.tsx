"use client"
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-background">
            <Header />
            {children}
            <Footer />
          </div>
        </QueryClientProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
