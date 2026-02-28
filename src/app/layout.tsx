import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nivara - Sign In",
  description: "Welcome to Nivara. Access your account and continue your journey with us.",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
