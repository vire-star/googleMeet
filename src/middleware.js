import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // logged in user tries to go to login page
  if (req.nextUrl.pathname === "/user-auth" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // user not logged in
  if (!token && req.nextUrl.pathname !== "/user-auth") {
    return NextResponse.redirect(new URL("/user-auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
