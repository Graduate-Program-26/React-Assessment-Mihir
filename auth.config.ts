import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLanding = nextUrl.pathname.startsWith('/landing');
            if (isOnLanding) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/landing', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;