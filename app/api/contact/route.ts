import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const contact = await Contact.create(body);

        // You could add email notification here using Nodemailer

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
