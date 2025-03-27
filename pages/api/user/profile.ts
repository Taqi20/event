import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        let user;
        // Prefer using userId if available, otherwise fallback to email
        if (token.userId) {
            user = await prisma.user.findUnique({
                where: { id: token.userId as number },
                include: { Participant: true, accounts: true, sessions: true },
            });
        } else if (token.email) {
            user = await prisma.user.findUnique({
                where: { email: token.email as string },
                include: { Participant: true, accounts: true, sessions: true },
            });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User profile retrieved", user });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
