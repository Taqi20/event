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

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 30);

    try {
        const upcomingEvents = await prisma.event.findMany({
            where: {
                dateTime: {
                    gte: currentDate,
                    lt: futureDate,
                },
            },
            include: {
                Participant: true, // include participant details
            },
        });

        return res
            .status(200)
            .json({ message: "Upcoming events", events: upcomingEvents });
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
