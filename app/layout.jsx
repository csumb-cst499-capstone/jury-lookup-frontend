"use client";
import { Providers } from "./providers";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" title="JuryUp">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navigation />
          <div className="flex-grow">{children}</div>
          <hr className=" border border-gray-300" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
