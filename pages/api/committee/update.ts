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

    try {
        const { id, committeeName, description, committeeLogo, nickName, socialHandles, pubs } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Committee ID is required" });
        }

        const existingCommittee = await prisma.committee.findUnique({ where: { id } });
        if (!existingCommittee) {
            return res.status(404).json({ message: "Committee not found" });
        }

        const updatedCommittee = await prisma.committee.update({
            where: { id },
            data: {
                committeeName,
                description,
                committeeLogo,
                nickName,
                socialHandles: {
                    deleteMany: {},
                    create: socialHandles || [],
                },
                pubs: {
                    deleteMany: {},
                    create: pubs || [],
                },
            },
            include: {
                socialHandles: true,
                pubs: true,
            },
        });

        return res.status(200).json({ message: "Committee updated successfully", committee: updatedCommittee });
    } catch (error) {
        console.error("Error updating committee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
