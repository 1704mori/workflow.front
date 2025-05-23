import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // Protected routes - require authentication
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // Auth routes - redirect to dashboard if already authenticated 
  if (req.nextUrl.pathname.startsWith("/signin")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
