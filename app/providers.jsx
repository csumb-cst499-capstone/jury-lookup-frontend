"use client";

import { NextUIProvider } from "@nextui-org/react";
// import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <UserProvider>{children}</UserProvider>
    </NextUIProvider>
  );
}
