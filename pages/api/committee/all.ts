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
        const committees = await prisma.committee.findMany({
            include: {
                socialHandles: true,
                pubs: true,
            },
        });

        return res.status(200).json({ message: "Committees retrieved", committees });
    } catch (error) {
        console.error("Error fetching committees:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
