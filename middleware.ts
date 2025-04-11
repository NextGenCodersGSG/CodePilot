import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./@types";
import { getToken } from "./lib/storeGetDelete";
import { PageAccessName, protectedRoutes } from "./routes/types";
import pageAccessRights from "./routes/pageAccessRights";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken();
  const pageAccessRight = pageAccessRights.get(pathname as PageAccessName) || {
    roles: [],
  };

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    const hasToken = Boolean(token);
    if (hasToken) {
      return NextResponse.redirect(new URL("/already-signed-in", req.nextUrl));
    }
  }

  if (protectedRoutes.includes(pathname as PageAccessName)) {
    if (!token) {
      return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
    } else if (!pageAccessRight.roles.includes(token.userRole as Role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/code-analysis/:path*", "/sign-in/:path*", "/sign-up/:path*","/dashboard/:path*"],
};
