import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Workshop Gallery | Ravi Auto Service",
    description: "Take a look at our workshop, our team in action, and some of the bikes we've serviced and restored.",
};

const GalleryPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Visual Showcase</span>
                    <h1 className="font-heading text-5xl md:text-6xl font-bold text-white uppercase italic mb-6">
                        From the <span className="text-primary not-italic">Workshop</span>
                    </h1>
                    <p className="text-muted text-lg leading-relaxed">
                        A glimpse into our daily work, the tools we use, and snapshots of bikes we&apos;ve successfully serviced and restored to their former glory.
                    </p>
                </div>

                <GalleryGrid />
            </div>
        </div>
    );
};

export default GalleryPage;
