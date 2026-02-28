import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const contact = await Contact.findByIdAndDelete(params.id);

        if (!contact) {
            return NextResponse.json({
                success: false,
                error: 'Message not found'
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
