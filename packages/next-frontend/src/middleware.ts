import { NextRequest, NextResponse } from "next/server";

import { locales } from "./app/dictionaries/locales/locales";

export function middleware(request: NextRequest) {
  console.log("I'm in middleware");
  const lang = request.headers.get("Accept-Language");

  const path = request.nextUrl.pathname;
  console.log("path", request.nextUrl);
  const availableLocales = Object.keys(locales);

  if (availableLocales.some((locale) => `${path}/`.startsWith(`/${locale}/`))) {
    return NextResponse.next();
  }

  if (lang) {
    return NextResponse.redirect(new URL(`/${"pl"}${path}`, request.nextUrl));
  }

  const response = NextResponse.next();

  response.headers.set("x-user-name", "anton");

  return response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
