// app/layout.tsx
'use client'
import { Providers } from "../components/providers";
import { Navbar, Text } from "@nextui-org/react";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar isBordered variant={"static"}>
                     <Text b color="inherit" hideIn="xs">Jury Duty</Text>
          </Navbar> 
          {children}
        </Providers>
      </body>
    </html>
  );
}