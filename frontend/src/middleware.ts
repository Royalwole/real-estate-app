import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

// List of public routes that don't require authentication
const publicRoutes = [
  "/",
  "/listings",
  "/property/(.*)",
  "/api/listings",
  "/api/listings/(.*)",
  "/sign-in*",
  "/sign-up*"
];

function isPublic(path: string) {
  return publicRoutes.find(x => 
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  );
}

export async function middleware(request: NextRequest) {
  const { userId } = await getAuth(request);
  const path = request.nextUrl.pathname;

  // If the path is public, allow access
  if (isPublic(path)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the path isn't public, redirect to sign-in
  if (!userId) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect_url', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow users to access protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
