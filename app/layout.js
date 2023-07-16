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
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar isBordered position="floating">
            <NavbarBrand>
              <Logo width={200} height={32} color="black" />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link isBlock href="/admin">
                  Admin
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link isBlock href="/">
                  Home
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <div className="flex-grow">{children}</div>
          <footer className="flex flex-col items-center py-4">
            <div className="mb-2">
              <Logo width={200} height={32} color="blue" />
            </div>
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
