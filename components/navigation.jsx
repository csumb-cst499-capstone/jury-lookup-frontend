"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { redirect } from "next/navigation";
import Logo from "@/components/logo";
export function Navigation() {
  return (
    <>
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
          <NavbarItem>
            <Link isBlock href="/api/auth/login">
              Sign In
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link isBlock href="/api/auth/signout">
              Sign Out
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default Navigation;
