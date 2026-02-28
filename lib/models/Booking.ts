import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking {
    customerName: string;
    phone: string;
    email?: string;
    bikeBrand?: string;
    bikeModel?: string;
    yearOfPurchase?: number;
    serviceTypes: string[];
    problemDescription?: string;
    preferredDate: Date;
    timeSlot: string;
    pickupRequired: boolean;
    pickupAddress?: string;
    status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    customerName: {
        type: String,
        required: [true, 'Please provide a name.'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number.'],
    },
    email: {
        type: String,
    },
    bikeBrand: {
        type: String,
    },
    bikeModel: {
        type: String,
    },
    yearOfPurchase: {
        type: Number,
    },
    serviceTypes: {
        type: [String],
    },
    problemDescription: {
        type: String,
    },
    preferredDate: {
        type: Date,
        required: [true, 'Please provide a preferred date.'],
    },
    timeSlot: {
        type: String,
        required: [true, 'Please provide a time slot.'],
    },
    pickupRequired: {
        type: Boolean,
        default: false,
    },
    pickupAddress: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = (mongoose.models.Booking as mongoose.Model<IBooking>) || mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;
