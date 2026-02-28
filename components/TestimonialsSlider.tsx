'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
    name: string;
    rating: number;
    text: string;
    bike: string;
}

const TestimonialsSlider: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            name: 'Aditya Patil',
            rating: 5,
            text: "Excellent service! My Royal Enfield feels brand new after the engine work. Very knowledgeable mechanics and fair pricing.",
            bike: 'RE Classic 350'
        },
        {
            name: 'Sameer Khan',
            rating: 5,
            text: "Only place in Navi Mumbai I trust for my Yamaha R15. Genuine parts and they always deliver on time. Highly recommended!",
            bike: 'Yamaha R15 V4'
        },
        {
            name: 'Rahul Deshmukh',
            rating: 4,
            text: "Good experience for general servicing. The pickup and drop service is very convenient for office goers like me.",
            bike: 'Honda Activa 6G'
        },
        {
            name: 'Priyanka More',
            rating: 5,
            text: "Quick fix for my scooty's electrical issue. Other shops were saying it would take 2 days, Ravi Auto did it in 2 hours!",
            bike: 'TVS Jupiter'
        },
        {
            name: 'Vikram Singh',
            rating: 5,
            text: "The best shop for Bajaj servicing. Professional work and they explain every detail clearly. Fixed my chain issues perfectly.",
            bike: 'Bajaj Pulsar 220'
        }
    ];

    return (
        <div className="relative pt-12">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, el: '.custom-pagination' }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-16"
            >
                {testimonials.map((t, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-dark-card border border-white/5 p-10 rounded-3xl h-full flex flex-col items-start gap-6 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-500">
                                <Quote size={80} className="text-primary" />
                            </div>

                            <div className="flex gap-1">
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        size={16}
                                        fill={idx < t.rating ? "#FF9F1C" : "transparent"}
                                        className={idx < t.rating ? "text-secondary" : "text-muted/30"}
                                    />
                                ))}
                            </div>

                            <p className="text-light/90 italic leading-relaxed flex-grow">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-heading font-bold text-lg text-white">{t.name}</span>
                                    <span className="text-muted text-xs uppercase tracking-tighter">{t.bike}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-pagination flex justify-center mt-4" />
        </div>
    );
};

export default TestimonialsSlider;
