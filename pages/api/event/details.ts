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
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { eventId } = req.query;
    if (!eventId) {
        return res.status(400).json({ message: 'Event ID is required' });
    }

    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(eventId) },
            include: {
                Participant: true,  //include participant data
            },
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json({ event });
    } catch (error) {
        console.error('Error fetching event details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
