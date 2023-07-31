import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <UserProvider>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </UserProvider>
    </NextUIProvider>
  );
}
