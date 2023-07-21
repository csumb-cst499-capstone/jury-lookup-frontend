import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      // Add the `offline_access` scope to also get a Refresh Token
      scope: process.env.AUTH0_SCOPE, // or AUTH0_SCOPE
    },
    returnTo: "/admin",
  }),
});
