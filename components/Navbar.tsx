'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Wrench, Phone } from 'lucide-react';
import { SHOP_INFO } from '@/lib/constants';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 relative overflow-hidden rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors">
                        <img
                            src="/images/ravi_auto_logo.png"
                            alt="Ravi Auto Logo"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading text-xl font-bold tracking-wider leading-none">
                            {SHOP_INFO.name.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-primary font-medium tracking-[0.2em]">
                            {SHOP_INFO.nameMarathi}
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-bold hover:text-primary transition-all duration-300 relative group/link ${scrolled ? 'text-light' : 'text-white drop-shadow-md'
                                } ${pathname === link.href ? 'text-primary' : ''}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'}`} />
                        </Link>
                    ))}
                    <Link
                        href="/booking"
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
                    >
                        BOOK NOW
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-light"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-dark-card border-b border-primary/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="flex flex-col gap-4 p-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-lg font-medium ${pathname === link.href ? 'text-primary' : 'text-light'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/booking"
                        className="bg-primary text-white text-center px-6 py-3 rounded-lg font-bold mt-2"
                        onClick={() => setIsOpen(false)}
                    >
                        BOOK APPOINTMENT
                    </Link>
                    <div className="flex items-center gap-3 mt-4 text-muted pt-4 border-t border-white/5">
                        <Phone size={18} className="text-primary" />
                        <span className="text-sm font-medium">{SHOP_INFO.phone1}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
