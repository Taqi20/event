import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { qrCodeToken } = req.body;

        if (!qrCodeToken) {
            return res.status(400).json({ message: "QR Code token is required" });
        }

        const participant = await prisma.participant.findUnique({
            where: { qrCodeToken },
        });

        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        if (participant.hasAttended) {
            return res.status(400).json({ message: "Attendance already marked" });
        }

        await prisma.participant.update({
            where: { id: participant.id },
            data: { hasAttended: true },
        });

        return res.status(200).json({ message: "Attendance marked successfully" });
    } catch (error) {
        console.error("Error marking attendance:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
