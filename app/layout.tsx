import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "../components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match Scheduler",
  description: "Schedule and manage tournament matches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800   bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:via-black dark:to-gray-600 transition-all duration-500 dark:text-gray-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <Navbar />
            <main className="py-8 ">
              {/* Container to center the content */}
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-9">{children}</div>
                </div>
              </div>
            </main>
          </div>
          {/*This `children` renders the page.tsx(general route), This is where the page content will be rendered */}
        </ThemeProvider>
      </body>
    </html>
  );
}
