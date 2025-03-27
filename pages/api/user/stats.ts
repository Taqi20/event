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
        const totalEvents = await prisma.participant.count({
            where: {
                userId: token.userId as number,
            },
        });

        const attendedEvents = await prisma.participant.count({
            where: {
                userId: token.userId as number,
                hasAttended: true,
            },
        });

        return res.status(200).json({
            message: "User stats retrieved",
            stats: {
                totalEvents,
                attendedEvents,
            },
        });
    } catch (error) {
        console.error("Error retrieving user stats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
