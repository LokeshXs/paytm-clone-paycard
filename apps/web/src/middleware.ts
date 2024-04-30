import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  authApiPrefix,
  authRoutes,
  publicRoutes,
} from "../routes";

export async function middleware(request: NextRequest) {
  const urlPathname = request.nextUrl.pathname;
  const session = await auth();
  const isLoggedIn = session ? true : false;
  console.log(isLoggedIn);
  console.log(urlPathname);

  const isAuthApiRoute = urlPathname.startsWith(authApiPrefix);

  const isPublicRoute = publicRoutes.includes(urlPathname);

  const isAuthRoute = authRoutes.includes(urlPathname);

  if (isAuthApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl)
      );
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
  }

  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
