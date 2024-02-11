import Categories from "@/components/Categories";
import Chat from "@/components/Chat";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("h-screen bg-neutral-200", inter.className)}>
        <Categories />
        <div className="grid grid-cols-[2fr_1fr] gap-4 p-4">
          {children}
          <Chat />
        </div>
      </body>
    </html>
  );
}
