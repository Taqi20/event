import crypto from "crypto";

export default async function encrypt(email: string) {
    const secretKey = process.env.VERIFICATION_SECRET || "default_secret";
    const token = crypto.randomBytes(32).toString("hex");

    const encryptedToken = crypto
        .createHmac("sha256", secretKey)
        .update(`${email}:${token}`)
        .digest("hex");

    return {
        token,
        fullEncrypted: encryptedToken,
    };
}
