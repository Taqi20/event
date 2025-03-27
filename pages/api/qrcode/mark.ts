import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { markUserAttendance } from "@/services/qrServices";

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

    const { qrToken } = req.body;
    if (!qrToken) {
        return res.status(400).json({ message: "QR token is required" });
    }

    try {
        const updatedParticipant = await markUserAttendance(qrToken);
        return res.status(200).json({
            message: "Attendance marked successfully",
            participant: updatedParticipant,
        });
    } catch (error) {
        console.error("Error marking attendance:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
