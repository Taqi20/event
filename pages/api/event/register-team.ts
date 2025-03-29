//testing pending

import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { generateQRCodeToken } from "@/util/qrCode";
import { generateTeamCode } from "@/util/TeamCode";

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

    const { eventId } = req.body;
    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
    }

    try {
        const existingRegistration = await prisma.participant.findFirst({
            where: {
                userId: token.userId as number,
                eventId: Number(eventId),
                teamCode: { not: null }, // already registered with a team code
            },
        });

        if (existingRegistration) {
            return res.status(409).json({ message: "User already registered as a team leader for this event" });
        }

        // Generate a new unique team code and QR code token
        const teamCode = await generateTeamCode();
        const qrToken = await generateQRCodeToken();

        // Create a new participant record with the generated team code
        const newTeamRegistration = await prisma.participant.create({
            data: {
                userId: token.userId as number,
                eventId: Number(eventId),
                registrationDate: new Date(),
                teamCode, // teamCode is now generated and stored
                qrCodeToken: qrToken,
            },
            include: {
                event: true,
                user: true,
            },
        });

        return res.status(200).json({
            message: "Team registration successful",
            registration: newTeamRegistration,
        });
    } catch (error) {
        console.error("Error during team registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
