// GET /api/admin/seed — Run this ONCE to create admin user, then DELETE this file
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';

export async function GET() {
    try {
        await connectDB();
        const existing = await AdminUser.findOne({ username: 'admin' });
        if (existing) return NextResponse.json({ message: 'Admin already exists' });
        const hashed = await bcrypt.hash('ravi@admin123', 12);
        await AdminUser.create({ username: 'admin', password: hashed, name: 'Ravi Admin' });
        return NextResponse.json({ message: 'Admin user created! Username: admin, Password: ravi@admin123' });
    } catch (err) {
        return NextResponse.json({ error: String(err), stack: err.stack }, { status: 500 });
    }
}
