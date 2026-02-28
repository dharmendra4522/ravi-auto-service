import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // Return next response if auth is successful
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/admin/login',
        },
    }
);

export const config = {
    // Protected routes
    matcher: [
        '/admin/dashboard/:path*',
        '/admin/bookings/:path*',
        '/admin/messages/:path*',
        '/admin/settings/:path*',
    ],
};
