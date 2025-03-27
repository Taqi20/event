import { prisma } from "@/lib/prisma";

export async function markUserAttendance(qrToken: string) {
    return await prisma.participant.update({
        where: { qrCodeToken: qrToken },
        data: { hasAttended: true },
    });
}
