import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    try {
        const registeredEvents = await prisma.event.findMany({
            where: { Participant: { some: { user: { email: token.email } } } },
        });

        return res.status(200).json(registeredEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
