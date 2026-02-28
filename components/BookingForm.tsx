'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Loader2, Calendar, Clock, Bike, User, Wrench, Send } from 'lucide-react';
import { SHOP_INFO, SERVICES } from '@/lib/constants';

const bookingSchema = z.object({
    customerName: z.string().min(2, 'Name is required'),
    phone: z.string().length(10, 'Valid 10-digit phone number is required'),
    email: z.string().email().optional().or(z.literal('')),
    bikeBrand: z.string().min(1, 'Please select a brand'),
    bikeModel: z.string().min(1, 'Model is required'),
    serviceTypes: z.array(z.string()).min(1, 'Select at least one service'),
    problemDescription: z.string().optional(),
    preferredDate: z.string().min(1, 'Date is required'),
    timeSlot: z.string().min(1, 'Time slot is required'),
    pickupRequired: z.boolean().optional(),
    pickupAddress: z.string().optional(),
}).refine(data => !data.pickupRequired || (data.pickupRequired && data.pickupAddress && data.pickupAddress.length > 5), {
    message: "Address is required for pickup",
    path: ["pickupAddress"]
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
    preselectedService?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ preselectedService }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            customerName: '',
            phone: '',
            email: '',
            bikeBrand: '',
            bikeModel: '',
            serviceTypes: preselectedService
                ? [SERVICES.find(s => s.id === preselectedService)?.name || preselectedService]
                : [],
            preferredDate: '',
            timeSlot: '',
            pickupRequired: false,
            pickupAddress: '',
            problemDescription: '',
        }
    });

    const pickupRequired = watch('pickupRequired');
    const selectedServices = watch('serviceTypes') || [];

    // Sync preselected service if prop changes
    React.useEffect(() => {
        if (preselectedService) {
            const serviceName = SERVICES.find(s => s.id === preselectedService)?.name || preselectedService;
            setValue('serviceTypes', [serviceName]);
        }
    }, [preselectedService, setValue]);

    const onSubmit = async (data: BookingFormValues) => {
        setLoading(true);
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Booking Confirmed! We'll contact you shortly.");
                reset();
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            toast.error("Failed to book appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-dark-card border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Details */}
                <div className="space-y-6">
                    <h3 className="font-heading text-xl font-bold flex items-center gap-2 text-primary">
                        <User size={20} /> Customer Details
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Full Name *</label>
                            <input
                                {...register('customerName')}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                                placeholder="Ex. Ravi Kumar"
                            />
                            {errors.customerName && <p className="text-primary text-xs mt-1">{errors.customerName.message}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Phone Number *</label>
                            <input
                                {...register('phone')}
                                type="tel"
                                onInput={(e) => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                                }}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                                placeholder="10-digit mobile number"
                            />
                            {errors.phone && <p className="text-primary text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Email (Optional)</label>
                            <input
                                {...register('email')}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                                placeholder="yourname@gmail.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Bike Details */}
                <div className="space-y-6">
                    <h3 className="font-heading text-xl font-bold flex items-center gap-2 text-primary">
                        <Bike size={20} /> Bike Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Bike Brand *</label>
                            <select
                                {...register('bikeBrand')}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                            >
                                <option value="">Select Brand</option>
                                {SHOP_INFO.brandsServiced.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            {errors.bikeBrand && <p className="text-primary text-xs mt-1">{errors.bikeBrand.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Bike Model *</label>
                            <input
                                {...register('bikeModel')}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                                placeholder="Ex. Splendor Plus / RC 390"
                            />
                            {errors.bikeModel && <p className="text-primary text-xs mt-1">{errors.bikeModel.message}</p>}
                        </div>

                        <div className="flex items-center gap-4 py-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register('pickupRequired')}
                                    className="w-5 h-5 accent-primary rounded-lg cursor-pointer"
                                />
                                <span className="text-sm font-bold text-light group-hover:text-primary transition-colors">Doorstep Pickup Required?</span>
                            </label>
                        </div>

                        {pickupRequired && (
                            <div className="animate-fade-in">
                                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Pickup Address *</label>
                                <textarea
                                    {...register('pickupAddress')}
                                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all h-24"
                                    placeholder="Enter full address for pickup"
                                />
                                {errors.pickupAddress && <p className="text-primary text-xs mt-1">{errors.pickupAddress.message}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="font-heading text-xl font-bold flex items-center gap-2 text-primary">
                    <Wrench size={20} /> Service Selection
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SERVICES.map(service => (
                        <label
                            key={service.id}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-primary/50 ${selectedServices.includes(service.name)
                                ? 'bg-primary/20 border-primary text-light shadow-[0_0_20px_rgba(255,51,51,0.1)]'
                                : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
                                }`}
                        >
                            <input
                                type="checkbox"
                                value={service.name}
                                {...register('serviceTypes')}
                                className="sr-only"
                            />
                            <span className="text-sm font-medium">{service.name}</span>
                        </label>
                    ))}
                </div>
                {errors.serviceTypes && <p className="text-primary text-xs mt-1">{errors.serviceTypes.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 flex items-center gap-2">
                        <Calendar size={14} className="text-primary" /> Preferred Date *
                    </label>
                    <input
                        type="date"
                        {...register('preferredDate')}
                        min={new Date().toLocaleDateString('en-CA')}
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                    />
                    {errors.preferredDate && <p className="text-primary text-xs mt-1">{errors.preferredDate.message}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2 flex items-center gap-2">
                        <Clock size={14} className="text-primary" /> Preferred Time Slot *
                    </label>
                    <select
                        {...register('timeSlot')}
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                    >
                        <option value="">Select Time</option>
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
                    </select>
                    {errors.timeSlot && <p className="text-primary text-xs mt-1">{errors.timeSlot.message}</p>}
                </div>
            </div>

            <div className="pt-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Problem Description / Special Instructions</label>
                <textarea
                    {...register('problemDescription')}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all h-32"
                    placeholder="Describe your bike's issue or any specific requirements..."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white py-5 rounded-2xl font-black text-lg uppercase italic tracking-widest shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-[0.98]"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" /> CONFIRMING...
                    </>
                ) : (
                    <>
                        CONFIRM BOOKING <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
            </button>

            <p className="text-center text-muted text-xs">
                By clicking confirm, you agree to our terms and we will contact you on the provided phone number.
            </p>
        </form>
    );
};

export default BookingForm;
