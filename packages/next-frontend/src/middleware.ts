import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("I'm in middleware");
  console.log(request.headers.get("Cache-Control"));

  const response = NextResponse.next();

  response.headers.set("x-user-name", "anton");

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
