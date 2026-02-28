import React from 'react';
import { SHOP_INFO } from '@/lib/constants';
import { Award, Target, Heart, History } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | Ravi Auto Service",
    description: "Learn about the history, values, and mission of Ravi Auto Service. Your trusted bike repair shop in Navi Mumbai since 2019.",
};

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col">
            {/* Story Section */}
            <section className="pt-32 pb-24 bg-dark relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl skew-x-1">
                                <img
                                    src="https://images.unsplash.com/photo-1591438122444-06c00634919d?auto=format&fit=crop&q=80"
                                    alt="Our Workshop"
                                    className="w-full h-auto grayscale-[0.2]"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-3xl shadow-2xl z-20 hidden md:block">
                                <span className="block text-4xl font-heading font-black text-white italic">5+</span>
                                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Years of Trust</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Story</span>
                                <h1 className="font-heading text-5xl md:text-6xl font-bold text-white uppercase italic mb-6">
                                    Quality <span className="text-primary not-italic">Over Everything</span>
                                </h1>
                                <p className="text-muted text-lg leading-relaxed mb-6">
                                    Founded in 2019, {SHOP_INFO.name} started with a single goal: to provide high-quality, transparent, and affordable two-wheeler maintenance to the people of Navi Mumbai.
                                </p>
                                <p className="text-muted leading-relaxed">
                                    What began as a small workshop in Ghansoli Gaon has grown into a trusted name for riders across the city. We believe that a bike isn't just a machine; for many, it's their livelihood and passion. That's why we treat every machine with the same precision and care we'd give our own.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div className="flex flex-col gap-3">
                                    <Award className="text-primary" size={32} />
                                    <h4 className="text-light font-bold uppercase tracking-widest text-sm">Certified Experts</h4>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <History className="text-primary" size={32} />
                                    <h4 className="text-light font-bold uppercase tracking-widest text-sm">Rich Experience</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-dark-card">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Core Principles</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase italic">
                            Values that <span className="text-primary not-italic">Drive</span> Us
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Integrity',
                                desc: 'We only recommend what your bike truly needs. No unnecessary charges, no hidden costs.',
                                icon: Award
                            },
                            {
                                title: 'Mission',
                                desc: 'To keep every two-wheeler on the road running at its peak performance and safety.',
                                icon: Target
                            },
                            {
                                title: 'Passion',
                                desc: "We don't just fix bikes; we love them. Our passion reflect in the quality of our work.",
                                icon: Heart
                            }
                        ].map((v, i) => (
                            <div key={i} className="bg-dark p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <v.icon className="text-primary" size={32} />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-white uppercase italic mb-4">{v.title}</h3>
                                <p className="text-muted leading-relaxed text-sm">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Bar */}
            <section className="py-24 bg-dark">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

                        <h2 className="font-heading text-4xl md:text-5xl font-black text-white uppercase italic mb-8 relative z-10">
                            Visit Our <span className="text-dark">Workshop</span>
                        </h2>

                        <p className="text-white/80 text-lg mb-12 max-w-2xl relative z-10 font-medium">
                            Located in the heart of Ghansoli Gaon, our workshop is equipped with modern tools and a team of experts ready to help.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                                <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Address</h4>
                                <p className="text-white/90 font-medium">{SHOP_INFO.address.full}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                                <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Phone</h4>
                                <p className="text-white/90 font-medium">{SHOP_INFO.phone1} / {SHOP_INFO.phone2}</p>
                            </div>
                        </div>

                        <a
                            href={SHOP_INFO.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-12 bg-dark text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-dark/80 transition-all relative z-10"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
