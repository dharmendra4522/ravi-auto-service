import React from 'react';
import { Zap, Users, Shield, Wrench, Smile, Truck, LucideIcon } from 'lucide-react';

interface Feature {
    title: string;
    desc: string;
    icon: LucideIcon;
}

const WhyChooseUs: React.FC = () => {
    const features: Feature[] = [
        {
            title: 'Fast Service',
            desc: 'Quick turnaround time to get you back on the road ASAP.',
            icon: Zap
        },
        {
            title: 'Expert Mechanics',
            desc: 'Experienced and certified team with passion for bikes.',
            icon: Users
        },
        {
            title: 'Genuine Parts',
            desc: 'We only use authentic spare parts for maximum longevity.',
            icon: Shield
        },
        {
            title: 'Expert Tools',
            desc: 'Latest diagnostic and repair equipment for precision work.',
            icon: Wrench
        },
        {
            title: 'Affordable Rates',
            desc: 'Transparent pricing with no hidden costs or surprises.',
            icon: Smile
        },
        {
            title: 'Pickup & Drop',
            desc: 'Convenient doorstep service available in Navi Mumbai.',
            icon: Truck
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((f, i) => (
                <div key={i} className="flex gap-6">
                    <div className="shrink-0">
                        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                            <f.icon className="text-primary" size={24} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-heading text-xl font-bold mb-2 text-light">{f.title}</h4>
                        <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WhyChooseUs;
