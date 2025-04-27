import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const verificationRecord = await prisma.verificationToken.findFirst({
            where: { token },
        });

        if (!verificationRecord) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (verificationRecord.expires < new Date()) {
            return res.status(400).json({ message: "Token expired" });
        }

        await prisma.user.update({
            where: { email: verificationRecord.identifier },
            data: { verificationStatus: true },
        });

        //delete after verification
        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: verificationRecord.identifier,
                    token: verificationRecord.token,
                },
            },
        });

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
