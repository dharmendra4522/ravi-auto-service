import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const { status } = body;

        const booking = await Booking.findByIdAndUpdate(
            params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return NextResponse.json({
                success: false,
                error: 'Booking not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: booking
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message || 'Server Error'
        }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const booking = await Booking.findByIdAndDelete(params.id);

        if (!booking) {
            return NextResponse.json({
                success: false,
                error: 'Booking not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {}
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: 'Server Error'
        }, { status: 500 });
    }
}
