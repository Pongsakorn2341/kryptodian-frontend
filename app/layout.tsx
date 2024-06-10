import ToasterProvider from "@/components/common/ToastProvider";
import NextAuthProvider from "@/context/NextAuthProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kryptodian",
  description: "Kryptodian cryptocurrencies dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("h-full bg-[#1e2124] overflow-auto", inter.className)}
      >
        <NextAuthProvider>
          <ToasterProvider />
        </NextAuthProvider>
        {children}
      </body>
    </html>
  );
}