import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { eventId, eventDetails } = req.body;
    if (!eventId || !eventDetails) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const updatedEvent = await prisma.event.update({
            where: { id: Number(eventId) },
            data: {
                ...eventDetails,
                dateTime: new Date(eventDetails.dateTime),
            },
        });

        return res
            .status(200)
            .json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
