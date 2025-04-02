import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: token.email },
        select: { roleId: true },
    });

    if (!currentUser || currentUser.roleId !== 2) {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    const { targetEmail, newRoleId } = req.body;
    if (!targetEmail || !newRoleId) {
        return res.status(400).json({ message: "targetEmail and newRoleId are required" });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { email: targetEmail },
            data: { roleId: newRoleId },
        });
        return res.status(200).json({ message: "User role updated", user: updatedUser });
    } catch (error) {
        console.error("Error updating user role:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
