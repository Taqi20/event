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

    const { name, gender, profilePic } = req.body;

    if (!name && !gender && !profilePic) {
        return res.status(400).json({ message: "No update data provided" });
    }

    try {
        let updatedUser;
        if (token.userId) {
            updatedUser = await prisma.user.update({
                where: { id: token.userId as number },
                data: { name, gender, profilePic },
            });
        } else if (token.email) {
            updatedUser = await prisma.user.update({
                where: { email: token.email as string },
                data: { name, gender, profilePic },
            });
        } else {
            return res.status(400).json({ message: "No valid identifier found" });
        }

        return res.status(200).json({ message: "User profile updated", user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
