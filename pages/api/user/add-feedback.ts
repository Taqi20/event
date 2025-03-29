import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { rating, comment } = req.body;
    if (rating === undefined || comment === undefined) {
        return res.status(400).json({ message: "Rating and comment are required" });
    }

    try {
        const feedback = await prisma.feedBack.create({
            data: {
                rating: Number(rating),
                comment,
                status: true,
                user: {
                    connect: {
                        id: token.userId as number,
                    },
                },
            },
        });

        return res.status(200).json({ message: "Feedback added successfully", feedback });
    } catch (error) {
        console.error("Error adding feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
