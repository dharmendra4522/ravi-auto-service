import React from 'react';
import ServicesGrid from '@/components/ServicesGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Professional Bike Services | Ravi Auto Service",
    description: "Explore our range of bike repair and maintenance services in Navi Mumbai. General servicing, engine repair, painting, and more.",
};

const ServicesPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mb-16">
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Comprehensive Care</span>
                    <h1 className="font-heading text-5xl md:text-6xl font-bold text-white uppercase italic mb-6">
                        Our <span className="text-primary not-italic">Services</span>
                    </h1>
                    <p className="text-muted text-lg leading-relaxed">
                        From routine maintenance to complex engine repairs, we provide a wide array of services for all types of two-wheelers. Our expert mechanics use genuine parts to ensure your ride stays smooth and safe.
                    </p>
                </div>

                <ServicesGrid />

                {/* Specialized Section */}
                <div className="mt-32 bg-dark-card rounded-[3rem] p-12 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-heading text-3xl font-bold text-white uppercase italic mb-6">
                                Specialized in <span className="text-primary not-italic">Full Restoration</span>
                            </h2>
                            <p className="text-muted mb-8">
                                Got an old bike gathering dust? We specialize in complete vintage bike restorations. From engine rebuilds to custom paint jobs, we bring classic machines back to life.
                            </p>
                            <ul className="space-y-4">
                                {['Engine Overhauling', 'Chassis Repair', 'Custom Painting', 'Authentic Part Sourcing'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-light font-medium">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80"
                                alt="Bike Restoration"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
