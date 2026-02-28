'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface Stat {
    label: string;
    value: number;
    suffix: string;
    desc: string;
}

const AnimatedCounter = ({ value, suffix }: { value: number, suffix: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 }); // Start when half visible

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(v: number) {
                    if (ref.current) {
                        ref.current.textContent = Math.round(v) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value, suffix]);

    return (
        <span ref={ref} className="text-4xl md:text-5xl font-heading font-black text-primary italic group-hover:scale-110 transition-transform flex items-center justify-center">
            0{suffix}
        </span>
    );
};

const StatsCounter: React.FC = () => {
    const stats: Stat[] = [
        { label: 'Happy Customers', value: 500, suffix: '+', desc: 'And counting...' },
        { label: 'Years Experience', value: 5, suffix: '+', desc: 'Quality service' },
        { label: 'Bikes Repaired', value: 1000, suffix: '+', desc: 'All brands' },
        { label: 'Same Day Service', value: 90, suffix: '%', desc: 'Of all jobs' }
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
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <span className="text-light text-sm font-bold uppercase tracking-widest mt-2">
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
