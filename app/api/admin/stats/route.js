import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import Contact from '@/lib/models/Contact';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const [
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalContacts,
        todayBookings,
        recentBookings,
    ] = await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: 'pending' }),
        Booking.countDocuments({ status: 'confirmed' }),
        Booking.countDocuments({ status: 'completed' }),
        Booking.countDocuments({ status: 'cancelled' }),
        Contact.countDocuments(),
        Booking.countDocuments({
            createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }),
        Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Monthly bookings for chart (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthlyData = await Booking.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    return NextResponse.json({
        success: true,
        stats: {
            totalBookings, pendingBookings, confirmedBookings,
            completedBookings, cancelledBookings, totalContacts,
            todayBookings, recentBookings, monthlyData
        }
    });
}
