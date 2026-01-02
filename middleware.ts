export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/sleep/:path*', '/ai/:path*', '/profile/:path*'],
}

