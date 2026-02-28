import nodemailer from 'nodemailer';

export const sendEmailNotification = async (subject: string, htmlContent: string) => {
    try {
        const adminEmail = "dharmendravishwakarma0711@gmail.com"; // Set for testing

        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.warn("SMTP credentials missing in .env.local - skipping email.");
            return false;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL, // Admin's sender email
                pass: process.env.SMTP_PASSWORD, // 16-character App Password
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: adminEmail,
            subject: subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
