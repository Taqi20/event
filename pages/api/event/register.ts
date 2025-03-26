import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { prisma } from "@/lib/prisma"

import { generateQRCodeToken } from '@/util/qrCode'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as { user?: { id: number } };
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { eventId, teamCode } = req.body;

    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" })
    }

    try {
        const existingRegistration = await prisma.participant.findFirst({
            where: {
                userId: token.user?.id,
                eventId: Number(eventId),
            },
        })

        if (existingRegistration) {
            return res.status(400).json({ message: "User already registered for this event" })
        }

        const qrToken = await generateQRCodeToken();

        const newRegistration = await prisma.participant.create({
            data: {
                userId: token.user?.id as number,
                eventId: Number(eventId),
                registrationDate: new Date(),
                qrCodeToken: qrToken,
                ...(teamCode && { teamCode }),
            },
            include: {
                event: true,
                user: true,
            }
        });

        return res.status(200).json({
            message: "Registration successful",
            registration: newRegistration,
        });
    } catch (error) {
        console.error("Error during event registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}