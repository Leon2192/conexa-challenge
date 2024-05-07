import type { Metadata } from "next";
import "./globals.css";
import { WavyBackground } from "@/components/ui/Background/wavy-background";
import { Gloria_Hallelujah } from "next/font/google";

const gloria = Gloria_Hallelujah({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Rick & Morty - Characters",
  description: "Veamos si hay episodios!",
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
