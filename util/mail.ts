import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const verificationLink = `${process.env.NEXTAUTH_URL}/dashboard/profile/verify?token=${encodeURIComponent(token)}`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Please click the following link to verify your email:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Email could not be sent");
    }
}
