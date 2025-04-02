import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { eventId } = req.query;
    if (!eventId || isNaN(Number(eventId))) {
        return res.status(400).json({ message: "A valid eventId is required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const participant = await prisma.participant.findFirst({
            where: {
                userId: user.id,
                eventId: Number(eventId),
            },
        });

        if (!participant) {
            return res.status(404).json({ message: "Registration not found" });
        }

        await prisma.participant.delete({
            where: { id: participant.id },
        });

        return res.status(200).json({ message: "Registration cancelled successfully" });
    } catch (error) {
        console.error("Error cancelling registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
