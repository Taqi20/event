import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: { id: number; eventName: string; eventPoster: string; dateTime: string; venue: string; about: string; entryFee: string; prize: string; isOnline: boolean; team: boolean; Participant: { id: number; userId: number; registrationDate: string; teamCode?: string; hasAttended: boolean; qrCodeToken: string; }[]; } | null;
            email: string;
        };
    }

    interface User {
        id: number;
        email: string;
        name?: string | null;
        image?: string | null;
    }
}