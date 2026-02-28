import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // 1. Create booking in Database
        const booking = await Booking.create(body);

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
