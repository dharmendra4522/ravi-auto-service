import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsCounter from '@/components/StatsCounter';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { ChevronRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col">
            <HeroSection />

            {/* Services Highlight */}
            <section className="py-24 bg-dark">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="max-w-2xl">
                            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Expertise</span>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase italic">
                                Popular <span className="text-primary not-italic">Services</span> we offer
                            </h2>
                        </div>
                        <Link
                            href="/services"
                            className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all"
                        >
                            View All Services <ChevronRight size={20} />
                        </Link>
                    </div>

                    <ServicesGrid limit={3} />
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-dark-card border-y border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <StatsCounter />
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Advantages</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase italic mb-6">
                            Why <span className="text-primary not-italic">Ravi Auto Service</span>?
                        </h2>
                        <p className="text-muted leading-relaxed">
                            We combine years of experience with modern tools to provide your bike the care it deserves. Our transparent process ensures you know exactly what&apos;s happening with your machine.
                        </p>
                    </div>

                    <WhyChooseUs />
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-dark-card border-t border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Reviews</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase italic">
                            What <span className="text-primary not-italic">Riders</span> Say
                        </h2>
                    </div>

                    <TestimonialsSlider />
                </div>
            </section>

            {/* Ready CTA */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h2 className="font-heading text-4xl md:text-6xl font-black text-white uppercase italic mb-8 drop-shadow-xl">
                        Is your bike due for a <span className="text-dark">checkup</span>?
                    </h2>
                    <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto font-medium">
                        Don&apos;t wait for a breakdown. Book a professional service today and experience the difference in performance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href="/booking"
                            className="bg-dark text-white px-10 py-5 rounded-xl font-black uppercase italic tracking-widest hover:bg-dark/90 transition-all shadow-2xl hover:-translate-y-1"
                        >
                            BOOK NOW
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-10 py-5 rounded-xl font-black uppercase italic tracking-widest transition-all backdrop-blur-sm"
                        >
                            CONTACT US
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
