import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // const session = await getSession({ req });
    // if (!session) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const {
        eventName,
        eventPoster,
        dateTime,
        venue,
        about,
        isOnline,
        prize,
        entryFee,
        team,
        committeeId
    } = req.body;

    //basic validation
    if (!eventName || !dateTime || !venue) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newEvent = await prisma.event.create({
            data: {
                eventName,
                eventPoster,
                dateTime: new Date(dateTime),
                venue,
                about,
                isOnline,
                prize,
                entryFee,
                team,
                committeeId
            },
        });
        res.status(200).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}