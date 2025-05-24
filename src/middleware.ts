import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const privatePath = ['/api/chat', '/api/getRepos', '/api/cloneRepo', '/api/auth', '/repo',];
    const publicPath = ['/signin'];

    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    if(privatePath.includes(pathname) && !token)
    {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    if(token && publicPath.includes(pathname))
    {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/chat',
        '/api/getRepos',
        '/api/cloneRepo',
        '/api/auth',
        '/repo',
        '/signin',
    ],
}