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

    const { committeeId } = req.query;
    if (!committeeId) {
        return res.status(400).json({ message: "Committee id is required" });
    }

    try {
        const committee = await prisma.committee.findUnique({
            where: { id: Number(committeeId) },
            include: {
                socialHandles: true,
                events: true,
            },
        });

        if (!committee) {
            return res.status(404).json({ message: "Committee not found" });
        }

        return res.status(200).json({ message: "Committee info retrieved", committee });
    } catch (error) {
        console.error("Error retrieving committee info:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
