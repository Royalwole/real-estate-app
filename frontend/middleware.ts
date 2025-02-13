import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/listings",
    "/property/(.*)",
    "/api/listings",
    "/api/listings/(.*)",
  ],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
