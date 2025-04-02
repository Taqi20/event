import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { department, year, division, rollNo } = req.body;
    if (!department || !year || !division || !rollNo) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: token.email },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const academicInfo = await prisma.academicInfo.upsert({
            where: { userId: user.id },
            update: {
                department,
                year: Number(year),
                division,
                rollNo,
            },
            create: {
                userId: user.id,
                department,
                year: Number(year),
                division,
                rollNo,
            },
        });

        return res.status(200).json({
            message: "Academic info updated successfully",
            academicInfo,
        });
    } catch (error) {
        console.error("Error updating academic info:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
