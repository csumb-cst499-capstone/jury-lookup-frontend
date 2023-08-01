"use client";

import { Providers } from "./providers";
import { useState } from "react";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

import "../styles/globals.css";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <html lang="en" title="JuryUp">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navigation setLogin={setIsLoggedIn} />
          <div className="flex-grow">{children}</div>
          <hr className=" border border-gray-300" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
