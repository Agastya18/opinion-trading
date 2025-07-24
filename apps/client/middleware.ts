import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(req: NextRequest) {
  const token_key = process.env.JWT_AUTH_KEY as string;
  const token = req.cookies.get(token_key);
  if(!token){
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
}
 
export const config = {
  matcher: ['/wallet/:path*', '/portfolio:path*', '/events/:id*'],
}