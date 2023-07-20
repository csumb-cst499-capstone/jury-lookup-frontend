import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

import { useUser } from "@auth0/nextjs-auth0/client";

import Logo from "@/components/logo";

export function Navigation() {
  const { user } = useUser();

  return (
    <>
      <Navbar isBordered position="floating">
        <NavbarBrand>
          <Logo width={200} height={32} color="black" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/">Home</Link>
          </NavbarItem>
          {!user ? (
            <NavbarItem>
              <Link href="/api/auth/login">Login</Link>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem>
                <Link href="/admin">Admin</Link>
              </NavbarItem>

              <NavbarItem>
                <Link href="/api/auth/logout">Logout</Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default Navigation;
