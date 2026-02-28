'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { SHOP_INFO } from '@/lib/constants';

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background with Grid & Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#E6394633,transparent_50%)]" />
                <div className="absolute inset-0 bg-dark/70 z-[1]" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale scale-110 blur-[1px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full w-fit">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Premium Bike Care</span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight text-white uppercase italic">
                            Your Trusted <span className="text-primary not-italic">Bike Repair</span> Expert
                        </h1>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-dark/20 backdrop-blur-sm rounded-3xl -z-10" />
                            <p className="text-white/90 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                                Fast, reliable and affordable two-wheeler servicing in <span className="text-primary font-bold">{SHOP_INFO.address.city}</span>.
                                We treat your bike like it's our own with genuine parts and expert care.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Link
                                href="/booking"
                                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/30"
                            >
                                BOOK APPOINTMENT
                                <ChevronRight size={20} />
                            </Link>
                            <Link
                                href="/services"
                                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                VIEW SERVICES
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                            <div className="flex flex-col gap-2">
                                <Wrench size={24} className="text-primary" />
                                <span className="text-sm font-bold text-light">Expert Work</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <ShieldCheck size={24} className="text-primary" />
                                <span className="text-sm font-bold text-light">Genuine Parts</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Clock size={24} className="text-primary" />
                                <span className="text-sm font-bold text-light">Fast Turnaround</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

                        <div className="relative z-10 glass-card p-4 border border-white/10 rounded-3xl overflow-hidden shadow-2xl skew-y-2">
                            <img
                                src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80"
                                alt="Expert Mechanics at work"
                                className="rounded-2xl w-full h-auto object-cover grayscale-[0.2]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                            <div className="absolute bottom-10 left-10">
                                <span className="text-4xl font-heading font-black text-white italic drop-shadow-lg">EST. 2019</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/30">
                <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
                <div className="w-1 h-12 bg-white/10 rounded-full relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 48, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-0 w-full h-1/3 bg-primary rounded-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
