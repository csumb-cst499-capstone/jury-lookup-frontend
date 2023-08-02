"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Logo } from "./logo";
import LanguageSelector from "./language_selector";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const pageName = pathname?.split("/").pop();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand justify="start" className="hidden sm:flex">
          <Logo width={200} height={32} color="black" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pageName === ""}>
          <Link
            href="/"
            isBlock
            aria-label="Home"
            aria-current="Home Page"
            className="text-slate-800 hover:text-slate-900"
          >
            Home
          </Link>
        </NavbarItem>

        <NavbarItem data-active={pageName === "admin"}>
          <Link
            href="/admin"
            aria-label="Admin"
            aria-current="Admin Page"
            className="text-slate-800 hover:text-slate-900 hover:underline-offset-2"
          >
            Admin
          </Link>
        </NavbarItem>
      </NavbarContent>

      {!user ? (
        <>
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
              <LanguageSelector />
            </NavbarItem>
            <NavbarItem>
              <Button
                href="/api/auth/login"
                as={Link}
                className="bg-violet-700 text-white hover:bg-violet-700"
                variant="solid"
                aria-label="Login"
              >
                Login
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <>
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
              <LanguageSelector />
            </NavbarItem>

            <NavbarItem>
              <Button
                href="/api/auth/logout"
                as={Link}
                color="danger"
                variant="solid"
                aria-label="Logout"
              >
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className=" text-black hover:text-bold" href="/">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className=" text-black hover:text-bold" href="/admin">
            Admin
          </Link>
        </NavbarMenuItem>
        {!user ? (
          <>
            <NavbarMenuItem>
              <Link className="" href="/api/auth/login">
                Login
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link
                className=" text-danger hover:text-bold"
                href="/api/auth/logout"
              >
                Logout
              </Link>
            </NavbarMenuItem>
          </>
        )}
        <NavbarMenuItem>
          <LanguageSelector />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Navigation;
