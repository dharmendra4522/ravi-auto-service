// PUT /api/admin/settings/password
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';

export async function PUT(req) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { currentPassword, newPassword } = await req.json();
        if (!currentPassword || !newPassword || newPassword.length < 8) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        await connectDB();
        const user = await AdminUser.findOne({ username: session.user.username });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        return NextResponse.json({ success: true, message: 'Password updated' });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
