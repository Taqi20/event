import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const committees = await prisma.committee.findMany({
            include: {
                socialHandles: true,
                pubs: true,
                events: true,
            },
        });

        return res.status(200).json({ committees });
    } catch (error) {
        console.error("Error fetching committees:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
