"use client";

import { Providers } from "./providers";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Logo } from "../components/logo";
import { motion } from "framer-motion";
import "../styles/globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar
            isBordered
            position="floating"
            className="bg-white pt-5 pb-2"
          >
            <NavbarBrand>
              <Logo width={400} height={68} color="black" />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-8" justify="center">
              <NavbarItem>
                <Link isBlock href="/admin"
                      className="text-sm px-3 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-300"
                      >
                  Admin
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link isBlock href="/"
                      className="text-sm px-3 py-1 rounded-full bg-purple-500 text-white hover:bg-purple-300"
                      >
                  Home
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <div className="flex-grow">{children}</div>
          <hr className=" border border-gray-300" />
          <footer className="flex flex-col items-center py-4 bg-gray-100">
            <div className="mb-2">
              <Logo width={200} height={32} color="blue" />
            </div>
            <p className="text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
