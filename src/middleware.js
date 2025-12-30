import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't need auth
    const isPublicPath = path === '/' || path === '/login' || path === '/register' ||
        path.startsWith('/_next') || path.startsWith('/static');

    // If path is public, just continue
    if (isPublicPath) {
        return NextResponse.next();
    }

    // Retrieve token
    const token = request.cookies.get('token')?.value;
    const payload = token ? await verifyJWT(token) : null;

    // If no token, redirect to login
    if (!payload) {
        if (path.startsWith('/api')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based protection
    const role = payload.role;

    // Admin Routes
    if (path.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Security Routes
    if (path.startsWith('/security') && role !== 'SECURITY' && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Resident Routes (Admin can also view if needed, but primary is Resident)
    if (path.startsWith('/resident') && role !== 'RESIDENT' && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Protect all routes except auth API
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
};
