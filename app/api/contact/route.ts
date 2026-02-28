import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendEmailNotification } from '@/lib/email';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const contact = await Contact.create(body);

        // Send Telegram Notification
        const botMessage = `
💬 <b>NEW INQUIRY RECEIVED!</b> 💬
----------------------------------------
👤 <b>Name:</b> ${body.name}
📞 <b>Phone:</b> ${body.phone}
${body.email ? `✉️ <b>Email:</b> ${body.email}\n` : ''}
📝 <b>Message:</b>
<i>${body.message}</i>
----------------------------------------
<a href="${process.env.NEXTAUTH_URL}/admin/messages">View all messages in Admin Panel</a>
        `.trim();

        sendTelegramNotification(botMessage).catch(console.error);

        // Send Email Notification
        const emailSubject = `New Inquiry from ${body.name}`;
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #E63946;">New Contact Inquiry</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Phone:</strong> <a href="tel:${body.phone}">${body.phone}</a></p>
                <p><strong>Email:</strong> ${body.email || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f1f1f1; padding: 10px; border-radius: 5px; color: #333;">${body.message}</p>
                <br />
                <a href="${process.env.NEXTAUTH_URL}/admin/messages" style="background: #111; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
            </div>
        `;
        sendEmailNotification(emailSubject, emailHtml).catch(console.error);

        return NextResponse.json({
            success: true,
            data: contact
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message || 'Server Error'
        }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: contacts
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: 'Server Error'
        }, { status: 500 });
    }
}
