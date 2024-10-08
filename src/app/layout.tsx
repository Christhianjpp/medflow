import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SidebarMenu from "@/components/SidebarMenu";

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
  title: "Medflow",
  description: "Gestión  médica con inteligencia artificial",
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
        <div className=" flex h-screen">

          <SidebarMenu />
          <main className="flex-1 overflow-y-auto bg-white">

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
