import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: token.email },
        select: { roleId: true },
    });
    if (!currentUser || currentUser.roleId !== 2) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });

        return res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
