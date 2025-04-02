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
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { committeeId } = req.query;
    if (!committeeId) {
        return res.status(400).json({ message: "Committee ID is required" });
    }

    try {
        const events = await prisma.event.findMany({
            where: { committeeId: Number(committeeId) },
            select: { id: true },
        });

        if (!events.length) {
            return res.status(200).json({ message: "No events for this committee", members: [] });
        }

        const eventIds = events.map(event => event.id);

        const participants = await prisma.participant.findMany({
            where: { eventId: { in: eventIds } },
            include: { user: true },
        });

        const membersMap = new Map<number, typeof participants[0]["user"]>();
        participants.forEach(participant => {
            if (participant.user) {
                membersMap.set(participant.user.id, participant.user);
            }
        });

        const members = Array.from(membersMap.values());

        return res.status(200).json({
            message: "Committee members retrieved",
            members,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
