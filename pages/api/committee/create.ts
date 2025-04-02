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

    try {
        const { committeeName, description, committeeLogo, nickName, socialHandles, pubs } = req.body;

        if (!committeeName || !nickName) {
            return res.status(400).json({ message: "Committee name and nickname are required" });
        }

        const newCommittee = await prisma.committee.create({
            data: {
                committeeName,
                description,
                committeeLogo,
                nickName,
                socialHandles: {
                    create: socialHandles || [],
                },
                pubs: {
                    create: pubs || [],
                },
            },
            include: {
                socialHandles: true,
                pubs: true,
            },
        });

        return res.status(201).json({ message: "Committee created successfully", committee: newCommittee });
    } catch (error) {
        console.error("Error creating committee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
