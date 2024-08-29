import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  // "/askQuestion(.*)",
  "/collection(.*)",
  "/profile/edit(.*)",
  "/askQuestion",
]);

export default clerkMiddleware((auth, req) => {
  // Protect dashboard routes
  if (isProtectedRoute(req)) auth().protect();
  // All other routes are public by default
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
