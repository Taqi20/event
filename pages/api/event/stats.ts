import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

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

    const { eventId } = req.query;
    if (!eventId || isNaN(Number(eventId))) {
        return res.status(400).json({ message: "A valid eventId is required" });
    }

    try {
        const totalRegistrations = await prisma.participant.count({
            where: { eventId: Number(eventId) },
        });

        const attendedRegistrations = await prisma.participant.count({
            where: { eventId: Number(eventId), hasAttended: true },
        });

        // Calculate attendance percentage if there are registrations
        const attendancePercentage = totalRegistrations > 0
            ? Math.round((attendedRegistrations / totalRegistrations) * 100)
            : 0;

        return res.status(200).json({
            message: "Event statistics retrieved successfully",
            stats: {
                totalRegistrations,
                attendedRegistrations,
                attendancePercentage,
            },
        });
    } catch (error) {
        console.error("Error retrieving event stats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
