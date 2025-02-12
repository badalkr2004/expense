import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Green Expense Tracker",
  description: "Track your expenses with a touch of nature",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-cream text-bark-brown`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
