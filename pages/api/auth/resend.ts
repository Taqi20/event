import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { sendVerificationEmail } from "@/util/mail";
import encrypt from "@/util/verificationToken";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const email = token.email as string;
    if (!email) {
        return res.status(400).json({ message: "Email not found in token" });
    }

    try {
        const verificationData = await encrypt(email);

        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: verificationData.fullEncrypted,
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
            },
        });

        await sendVerificationEmail(email, verificationData.fullEncrypted);


        await sendVerificationEmail(email, verificationData.fullEncrypted);

        return res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error) {
        console.error("Error resending verification email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
