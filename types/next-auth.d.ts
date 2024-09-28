// types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
    }

    interface Session {
        user: User & {
            id: string;
            phone: string;
            createdAt: Date;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        phone: string;
        createdAt: Date;
    }
}