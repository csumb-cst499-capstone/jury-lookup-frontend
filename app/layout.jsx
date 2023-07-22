"use client";

import { Providers } from "./providers";
import { useState } from "react";
import { Logo } from "../components/logo";

import { Navigation } from "@/components/navigation";

import "../styles/globals.css";

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navigation setLogin={setIsLoggedIn} />
          <div className="flex-grow">{children}</div>
          <hr className=" border border-gray-300" />
          <footer className="flex flex-col items-center py-4 bg-gray-100">
            <div className="mb-2">
              <Logo width={200} height={32} color="blue" />
            </div>
            <p className="text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
