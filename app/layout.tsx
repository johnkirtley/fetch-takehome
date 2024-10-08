import "./globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";

import NavMenu from "../components/NavMenu";

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
  title: "Fetch Take Home",
  description: "Thank you for the opportunity to interview at Fetch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F3EA]`}
      >
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
