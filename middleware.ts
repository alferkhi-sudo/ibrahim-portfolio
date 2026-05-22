import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/request";
import { verifyWeekplanToken } from "./lib/weekplan-auth";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Weekplan API routes — auth checked in route handlers, skip intl
  if (pathname.startsWith("/api/weekplan")) {
    return NextResponse.next();
  }

  // Weekplan auth endpoint — always allow
  if (pathname.startsWith("/api/weekplan-auth")) {
    return NextResponse.next();
  }

  // Weekplan pages — check auth cookie
  if (pathname.startsWith("/weekplan")) {
    if (pathname === "/weekplan/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("weekplan_auth")?.value;
    const valid = token ? await verifyWeekplanToken(token) : false;

    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/weekplan/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // All other routes — next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|_vercel|restaurantform|.*\\..*).*)",
  ],
};
