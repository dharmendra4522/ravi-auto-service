import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing');
    process.exit(1);
}

async function testConnection() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ MongoDB Connected Successfully!');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections in DB:', collections.map(c => c.name));

        await mongoose.disconnect();
        console.log('Disconnected.');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        process.exit(1);
    }
}

testConnection();
