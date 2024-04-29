import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WavyBackground } from "@/components/ui/Background/wavy-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conexa - Challenge ",
  description: "Challenge desarrollado con Next js - Conexa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WavyBackground>{children}</WavyBackground>
      </body>
    </html>
  );
}
