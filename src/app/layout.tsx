import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nivara",
  description: "Nivara Product Hub — AI solutions catalog with role-based access",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
