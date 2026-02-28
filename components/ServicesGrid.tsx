import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import {
    Wrench,
    Settings,
    Disc,
    Circle,
    Zap,
    Palette,
    ArrowUpDown,
    Droplet,
    Sparkles,
    Truck,
    LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
    'wrench': Wrench,
    'settings': Settings,
    'disc': Disc,
    'circle': Circle,
    'zap': Zap,
    'palette': Palette,
    'arrow-up-down': ArrowUpDown,
    'droplet': Droplet,
    'sparkles': Sparkles,
    'truck': Truck
};

interface ServicesGridProps {
    limit?: number;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ limit }) => {
    const displayServices = limit ? SERVICES.slice(0, limit) : SERVICES;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service) => {
                const IconComponent = ICON_MAP[service.icon] || Wrench;

                return (
                    <div
                        key={service.id}
                        className="group bg-dark-card border border-white/5 p-8 rounded-2xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
                    >
                        {/* Hover Decor */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />

                        <div className="bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                            <IconComponent size={28} className="text-primary group-hover:text-white" />
                        </div>

                        <h3 className="font-heading text-2xl font-bold mb-3 text-light group-hover:text-primary transition-colors">
                            {service.name}
                        </h3>

                        <p className="text-muted text-sm leading-relaxed mb-6">
                            {service.description}
                        </p>

                        <div className="flex justify-between items-center pt-6 border-t border-white/5">
                            <span className="text-xs font-bold text-muted uppercase tracking-widest">Starts from</span>
                            <span className="text-lg font-heading font-black text-light italic">{service.startingPrice}</span>
                        </div>

                        <Link
                            href={`/booking?service=${service.id}`}
                            className="absolute inset-0 z-10"
                            aria-label={`Book ${service.name}`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ServicesGrid;
