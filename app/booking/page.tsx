import React, { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import { Calendar, Phone, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Book an Appointment | Ravi Auto Service",
    description: "Schedule your bike service online. Fast, reliable, and convenient booking for all two-wheelers in Navi Mumbai.",
};

// This wrapper handles the searchParams which makes the page dynamic
export default function BookingPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const preselected = typeof searchParams.service === 'string' ? searchParams.service : undefined;

    return (
        <div className="pt-32 pb-24 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Info Side */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Reservation</span>
                            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white uppercase italic mb-6">
                                Book Your <span className="text-primary not-italic">Service</span>
                            </h1>
                            <p className="text-muted text-lg leading-relaxed">
                                Skip the queue. Schedule your appointment online and our team will be ready for you. We value your time.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0 h-fit">
                                    <Calendar className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold mb-1">Instant Confirmation</h4>
                                    <p className="text-muted text-sm">Once you book, we&apos;ll call you to confirm the exact time slot.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0 h-fit">
                                    <Phone className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold mb-1">Support Available</h4>
                                    <p className="text-muted text-sm">Need help booking? Call us directly at 8097901003.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0 h-fit">
                                    <ShieldCheck className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold mb-1">Expert Guarantee</h4>
                                    <p className="text-muted text-sm">Every booking includes a complimentary 20-point safety check.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7">
                        <Suspense fallback={<div className="h-[600px] bg-dark-card rounded-3xl animate-pulse" />}>
                            <BookingForm preselectedService={preselected} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
