import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rewrite /public/... to /api/public/...
    const parts = request.url.split('public/')
    const domain = parts[0]
    const filePath = parts[1]
    const redirectTo = new URL(`/api/public/${filePath}`, domain)
    return NextResponse.rewrite(redirectTo);
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/public/:path*',
}