import {
  getSession,
  withApiAuthRequired,
  getAccessToken,
} from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

async function GET() {
  const session = getSession();
  console.log(session);

  const token = await getAccessToken();
  console.log(token);

  const url = new URL("http://localhost:8080/api/admin/search?query=bob");

  const data = await fetch(url);

  return new NextResponse({ status: 200, body: "Hello world!" });
}

export { GET };
