'use client';

import React, { useState } from 'react';
import Lightbox, { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
    src: string;
    category: string;
    title: string;
}

const GalleryGrid: React.FC = () => {
    const [index, setIndex] = useState(-1);
    const [filter, setFilter] = useState('All');

    const galleryImages: GalleryImage[] = [
        { src: '/images/workshop1.jpg', category: 'Workshop', title: 'Main Service Area' },
        { src: '/images/bike1.jpg', category: 'Bikes', title: 'Cruiser Servicing' },
        { src: '/images/team1.jpg', category: 'Team', title: 'Expert Mechanics at Work' },
        { src: '/images/workshop2.jpg', category: 'Workshop', title: 'Quality Parts' },
        { src: '/images/workshop3.jpg', category: 'Workshop', title: 'Our Workshop' },
        { src: '/images/bike2.jpg', category: 'Bikes', title: 'Performance Sports Bike' },
        { src: '/images/bike3.jpg', category: 'Bikes', title: 'Engine Tuning' },
        { src: '/images/workshop4.jpg', category: 'Before/After', title: 'Restored to Perfection' },
    ];

    const categories = ['All', 'Workshop', 'Bikes', 'Before/After', 'Team'];

    const filteredImages = filter === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    const slides: Slide[] = filteredImages.map(img => ({ src: img.src }));

    return (
        <div className="space-y-12">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${filter === cat
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'bg-white/5 text-muted hover:bg-white/10 hover:text-light'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredImages.map((img, i) => (
                    <div
                        key={i}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
                        onClick={() => setIndex(i)}
                    >
                        <img
                            src={img.src}
                            alt={img.title}
                            className="w-full transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                            <h4 className="text-white font-heading text-lg font-bold">{img.title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
            />
        </div>
    );
};

export default GalleryGrid;
