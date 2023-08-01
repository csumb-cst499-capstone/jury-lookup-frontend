import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { useUser } from "@auth0/nextjs-auth0/client";

import Logo from "@/components/logo";
import LanguageSelector from "./language_selector";

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
            <LanguageSelector />
          </NavbarItem>
          <NavbarItem>
            <Button
              href="/"
              as={Link}
              variant="flat"
              aria-label="Home"
              className="bg-violet-400 hover:bg-violet-700 text-white"
            >
              Home
            </Button>
          </NavbarItem>
          {!user ? (
            <NavbarItem>
              <Button
                href="/api/auth/login"
                as={Link}
                className="bg-violet-700 text-white shadow-violet-700 hover:bg-violet-700 shadow-md"
                variant="shadow"
                aria-label="Login"
              >
                Login
              </Button>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem>
                <Button
                  href="/admin"
                  as={Link}
                  variant="shadow"
                  className="bg-violet-400 hover:bg-violet-700 text-white"
                  aria-label="Admin"
                >
                  Admin
                </Button>
              </NavbarItem>

              <NavbarItem>
                <Button
                  href="/api/auth/logout"
                  as={Link}
                  color="danger"
                  variant="shadow"
                  aria-label="Logout"
                >
                  Logout
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default Navigation;
