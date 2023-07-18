import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };