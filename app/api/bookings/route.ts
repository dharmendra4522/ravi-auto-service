import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendEmailNotification } from '@/lib/email';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // 1. Create booking in Database
        const booking = await Booking.create(body);

        // 2. Send Telegram Notification
        const botMessage = `
🚨 <b>NEW BOOKING RECEIVED!</b> 🚨
----------------------------------------
👤 <b>Customer:</b> ${body.customerName}
📞 <b>Phone:</b> ${body.phone}
${body.email ? `✉️ <b>Email:</b> ${body.email}\n` : ''}
🏍️ <b>Bike:</b> ${body.bikeBrand} ${body.bikeModel}
📅 <b>Date:</b> ${new Date(body.preferredDate).toLocaleDateString()}
⏰ <b>Time Slot:</b> ${body.timeSlot || 'Any Time'}
🛠️ <b>Services:</b> ${(body.serviceTypes || []).join(', ')}
📍 <b>Pickup:</b> ${body.pickupRequired ? 'Yes - ' + body.pickupAddress : 'No Drop-off'}
📝 <b>Note:</b> ${body.problemDescription || 'None'}
----------------------------------------
<a href="${process.env.NEXTAUTH_URL}/admin/bookings">View all bookings in Admin Panel</a>
        `.trim();

        // Fire & Forget Telegram
        sendTelegramNotification(botMessage).catch(console.error);

        // 3. Send Email Notification
        const emailSubject = `New Booking: ${body.customerName} - ${body.bikeBrand}`;
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #E63946;">New Booking Request</h2>
                <p><strong>Customer:</strong> ${body.customerName}</p>
                <p><strong>Phone:</strong> <a href="tel:${body.phone}">${body.phone}</a></p>
                <p><strong>Email:</strong> ${body.email || 'N/A'}</p>
                <p><strong>Bike:</strong> ${body.bikeBrand} ${body.bikeModel}</p>
                <p><strong>Preferred Date:</strong> ${new Date(body.preferredDate).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> ${body.timeSlot || 'Any Time'}</p>
                <p><strong>Services:</strong> ${body.serviceTypes ? body.serviceTypes.join(', ') : 'Not selected'}</p>
                <p><strong>Home Pickup:</strong> ${body.pickupRequired ? 'Yes' : 'No'}</p>
                ${body.pickupRequired ? `<p><strong>Address:</strong> ${body.pickupAddress}</p>` : ''}
                <p><strong>Description:</strong> ${body.problemDescription || 'N/A'}</p>
                <br />
                <a href="${process.env.NEXTAUTH_URL}/admin/bookings" style="background: #111; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
            </div>
        `;
        sendEmailNotification(emailSubject, emailHtml).catch(console.error);

        return NextResponse.json({
            success: true,
            data: booking
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
        const bookings = await Booking.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: bookings
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: 'Server Error'
        }, { status: 500 });
    }
}
