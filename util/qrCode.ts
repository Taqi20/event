import QRCode from 'qrcode';
import randomstring from 'randomstring';
import { prisma } from '@/lib/prisma';

//func to generate qr code img url using token

export async function generateQRCode(token: string): Promise<string> {
    const frontendURL = process.env.FRONTEND_URL;
    return await QRCode.toDataURL(`${frontendURL}/attendance/verify?token=${token}`);
}

//func to generate a unique QR code token for event regis

export async function generateQRCodeToken(): Promise<string> {
    let code: string;
    let existingRecord;

    // Loop until a unique token is found (i.e., no existing participant has that token)
    do {
        code = randomstring.generate(7);
        existingRecord = await prisma.participant.findFirst({
            where: {
                qrCodeToken: code
            }
        });
    } while (existingRecord);

    return code;
}