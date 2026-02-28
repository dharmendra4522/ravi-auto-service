'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Loader2, Send } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().length(10, 'Valid 10-digit phone number is required'),
    email: z.string().email().optional().or(z.literal('')),
    message: z.string().min(10, 'Message should be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setLoading(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Thank you! your message has been sent.");
                reset();
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            toast.error("Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Name *</label>
                    <input
                        {...register('name')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                        placeholder="Your Name"
                    />
                    {errors.name && <p className="text-primary text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Phone *</label>
                    <input
                        {...register('phone')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                        placeholder="10-digit Phone"
                    />
                    {errors.phone && <p className="text-primary text-xs mt-1">{errors.phone.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Email (Optional)</label>
                <input
                    {...register('email')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all"
                    placeholder="yourname@gmail.com"
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Message *</label>
                <textarea
                    {...register('message')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light focus:border-primary outline-none transition-all h-32"
                    placeholder="How can we help you?"
                />
                {errors.message && <p className="text-primary text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
            >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        SEND MESSAGE <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
};

export default ContactForm;
