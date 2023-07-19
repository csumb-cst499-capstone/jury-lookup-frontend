import { useSession, signIn, signOut } from "next-auth/react";

export function GetToken() {
  const { data } = useSession();
  if (!data) {
    return (
      <div>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
  const { accessToken } = data;

  return accessToken;
}

export default GetToken;
