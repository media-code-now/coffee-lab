import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="site-header">
            <Link href="/" className="site-logo">
              Mushroom Coffee Lab
            </Link>
            <nav>
              <Link href="/blog">Blog</Link>
              <Link href="/topics/mushroom-coffee">Collections</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Mushroom Coffee Lab. Brew smarter.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
