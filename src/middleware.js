import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // user logged in but trying to access login page
  if (pathname === "/user-auth" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // user not logged in and trying to access protected routes
  if (!token && pathname !== "/user-auth") {
    return NextResponse.redirect(new URL("/user-auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
