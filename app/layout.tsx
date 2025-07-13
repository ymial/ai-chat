import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ai Chat",
  description: "Nice Ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
