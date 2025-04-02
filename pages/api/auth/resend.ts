import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { sendVerificationEmail } from "@/util/mail";
import encrypt from "@/util/verificationToken";

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
        // Generate a verification token for the email
        const verificationData = await encrypt(email);
        // Send the verification email using your mailing utility
        await sendVerificationEmail(email, verificationData.fullEncrypted);
        return res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error) {
        console.error("Error resending verification email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
