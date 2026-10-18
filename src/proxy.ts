import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE } from "./i18n/config";

// English is served at the root (/schemes → internally /en/schemes); Kannada lives under /kn.
// Visitors who picked Kannada before are sent back to the Kannada version.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/kn" || pathname.startsWith("/kn/")) return NextResponse.next();

  // /en/... is never linked — redirect to the clean URL so each page has one address
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (request.cookies.get(LANG_COOKIE)?.value === "kn") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/kn" : `/kn${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (icon.svg, robots.txt, sitemap.xml…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
