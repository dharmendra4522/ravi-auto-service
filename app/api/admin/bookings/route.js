import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
        query.$or = [
            { customerName: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { bikeBrand: { $regex: search, $options: 'i' } },
            { bikeModel: { $regex: search, $options: 'i' } },
        ];
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return NextResponse.json({ success: true, bookings, total, page, totalPages: Math.ceil(total / limit) });
}
