// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            userType: string;
            accessToken: string;
            justRestored?: boolean;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        userType: string;
        accessToken: string;
        justRestored?: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        userType: string;
        accessToken: string;
        justRestored?: boolean;
    }
}