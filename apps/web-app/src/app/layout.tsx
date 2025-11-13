import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legacy POC",
  description: "A Next.js application in a Rush.js monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: 16, borderBottom: "1px solid #ccc" }}>
          <nav style={{ display: "flex", gap: 16 }}>
            <a href="/">Home</a>
            <a href="/legacy">Legacy (ExtJS)</a>
            <a href="/react-demo">React Demo</a>
          </nav>
        </header>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}
