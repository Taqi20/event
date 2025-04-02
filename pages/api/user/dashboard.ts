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
    if (!token || !token.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const totalEvents = await prisma.participant.count({
            where: { userId: user.id }
        });

        const attendedEvents = await prisma.participant.count({
            where: { userId: user.id, hasAttended: true }
        });

        const feedbackData = await prisma.feedBack.findUnique({
            where: { userId: user.id },
            select: { rating: true }
        });

        const dashboard = {
            totalEvents,
            attendedEvents,
            feedbackRating: feedbackData ? feedbackData.rating : null
        };

        return res.status(200).json({ message: "Dashboard data retrieved", dashboard });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
