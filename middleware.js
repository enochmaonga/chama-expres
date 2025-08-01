import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const publicPages = ['/', '/login', '/contributions'];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    // Allow access to public pages
    if (publicPages.includes(pathname)) {
      return NextResponse.next();
    }

    // Restrict /dashboard to admin only
    if (pathname.startsWith('/dashboard')) {
      if (token?.user?.userType !== 'admin') {
        // Redirect non-admins to home or unauthorized page
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Allow access for authenticated users to other protected routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only authenticated users
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
