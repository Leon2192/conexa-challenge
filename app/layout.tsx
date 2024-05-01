import type { Metadata } from "next";
import "./globals.css";
import { WavyBackground } from "@/components/ui/Background/wavy-background";
import { Covered_By_Your_Grace } from "next/font/google";
import { Gloria_Hallelujah } from "next/font/google";

const cover = Covered_By_Your_Grace({ subsets: ["latin"], weight: "400" });
const gloria = Gloria_Hallelujah({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Conexa - Challenge ",
  description: "Challenge desarrollado con Next js - Conexa",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={gloria.className}>
        <WavyBackground>{children}</WavyBackground>
      </body>
    </html>
  );
}
