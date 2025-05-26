import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./utils/auth/token";

// Define public paths that don't require authentication
const publicPaths = ["/", "/signin", "/signup", "/reset-password"];

// Define admin-only paths
const adminPaths = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Check if the path is admin-only
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

  // If user is on a public path and has a valid token, redirect to home
  if (isPublicPath && token) {
    try {
      // Verify the token
      const payload = await verifyJWT(token);

      // If token is valid, redirect to home or dashboard based on role
      if (payload.role === "admins") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      // If token is invalid, remove it and continue to public path
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  // If user is not on a public path and doesn't have a token, redirect to home
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is on an admin path, verify their role
  if (isAdminPath && token) {
    try {
      const payload = await verifyJWT(token);
      if (payload.role !== "admins") {
        // If not admin, redirect to home
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If token is invalid, redirect to signin
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
