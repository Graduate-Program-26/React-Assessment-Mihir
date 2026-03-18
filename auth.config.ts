import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLanding = nextUrl.pathname.startsWith('/landing');
            const isOnLogin = nextUrl.pathname.startsWith('/login');

            if (isOnLanding) {
                return isLoggedIn;
            }
            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL('/landing', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;