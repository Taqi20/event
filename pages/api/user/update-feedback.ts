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
    if (!token || !token.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { rating, comment } = req.body;
    if (rating === undefined || comment === undefined) {
        return res.status(400).json({ message: "Rating and comment are required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedFeedback = await prisma.feedBack.update({
            where: { userId: user.id },
            data: {
                rating: Number(rating),
                comment,
            },
        });

        return res.status(200).json({
            message: "Feedback updated successfully",
            feedback: updatedFeedback,
        });
    } catch (error) {
        console.error("Error updating feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
