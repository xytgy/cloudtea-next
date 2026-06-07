import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = [
  "/cart",
  "/checkout",
  "/payment",
  "/orders",
  "/me",
  "/profile",
  "/favorites",
  "/address",
  "/support",
  "/feedback",
  "/tea-circle/post",
  "/merchant/register",
  "/merchant/shop",
  "/merchant/goods",
  "/merchant/orders",
  "/merchant/chat",
  "/admin/users",
  "/admin/audit",
  "/admin/feedback",
]

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("cloudtea-token")?.value

  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)",
  ],
}
