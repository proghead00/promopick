import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromoPick",
  description: "Pick the promo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-gradient-to-r from-purple-900 to-pink-700 text-white font-sans antialiased ${fontSans.className}`}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
