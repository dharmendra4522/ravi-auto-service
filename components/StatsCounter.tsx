'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
    label: string;
    value: string;
    desc: string;
}

const StatsCounter: React.FC = () => {
    const stats: Stat[] = [
        { label: 'Happy Customers', value: '500+', desc: 'And counting...' },
        { label: 'Years Experience', value: '5+', desc: 'Quality service' },
        { label: 'Bikes Repaired', value: '1000+', desc: 'All brands' },
        { label: 'Same Day Service', value: '90%', desc: 'Of all jobs' }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center flex flex-col items-center gap-2 group hover:bg-primary/5 transition-colors"
                >
                    <span className="text-4xl md:text-5xl font-heading font-black text-primary italic group-hover:scale-110 transition-transform">
                        {stat.value}
                    </span>
                    <span className="text-light text-sm font-bold uppercase tracking-widest">
                        {stat.label}
                    </span>
                    <span className="text-muted text-[10px] uppercase font-medium">
                        {stat.desc}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsCounter;
