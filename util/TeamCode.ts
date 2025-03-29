import randomstring from "randomstring";
import { prisma } from "@/lib/prisma";

export async function generateTeamCode(): Promise<string> {
    let code: string;
    let existingTeamCode;

    do {
        code = randomstring.generate(10);
        existingTeamCode = await prisma.participant.findFirst({
            where: { teamCode: code },
        });
    } while (existingTeamCode);

    return code;
}
