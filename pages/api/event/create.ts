import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // const session = await getSession({ req });
    // if (!session) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const {
        eventName,
        eventPoster,
        dateTime,
        venue,
        about,
        isOnline,
        prize,
        entryFee,
        team,
        committeeId
    } = req.body;

    if (!eventName || !dateTime || !venue || !committeeId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const committeeIdNumber = Number(committeeId);
    if (isNaN(committeeIdNumber)) {
        return res.status(400).json({ message: "Invalid committee ID" });
    }

    try {

        const uploadResponse = await cloudinary.uploader.upload(eventPoster, {
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET // Use the upload preset
        });

        const newEvent = await prisma.event.create({
            data: {
                eventName,
                eventPoster: uploadResponse.secure_url,
                dateTime: new Date(dateTime),
                venue,
                about,
                isOnline,
                prize,
                entryFee,
                team,
                committeeId: committeeIdNumber
            },
        });
        res.status(200).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}