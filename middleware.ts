import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Check for Tailscale IP (100.x.x.x) or localhost
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const ip = forwarded?.split(",")[0]?.trim() || realIp || ""

  const isTailscale = ip.startsWith("100.")
  const isLocalhost = ip === "127.0.0.1" || ip === "::1"

  if (!isTailscale && !isLocalhost) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
