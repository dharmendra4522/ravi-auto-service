'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SHOP_INFO } from '@/lib/constants';

const FloatingWhatsApp: React.FC = () => {
    return (
        <a
            href={SHOP_INFO.socialMedia.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/40 group flex items-center justify-center overflow-hidden"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap">
                Chat with us
            </span>

            {/* Pulse effect */}
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 group-hover:opacity-0 rounded-full transition-all duration-700" />
        </a>
    );
};

export default FloatingWhatsApp;
