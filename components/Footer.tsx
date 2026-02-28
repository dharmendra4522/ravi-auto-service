import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Mail, Facebook, Instagram, Clock } from 'lucide-react';
import { SHOP_INFO } from '@/lib/constants';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-card border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 relative overflow-hidden rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors">
                                <img
                                    src="/images/ravi_auto_logo.png"
                                    alt="Ravi Auto Logo"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading text-2xl font-bold tracking-wider leading-none">
                                    {SHOP_INFO.name.toUpperCase()}
                                </span>
                                <span className="text-[10px] text-primary font-medium tracking-[0.2em]">
                                    {SHOP_INFO.nameMarathi}
                                </span>
                            </div>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed">
                            {SHOP_INFO.tagline}
                        </p>
                        <div className="flex gap-4">
                            <a href={SHOP_INFO.socialMedia.whatsapp} className="bg-white/5 hover:bg-primary/20 p-2.5 rounded-full transition-colors group">
                                <MessageCircle size={20} className="text-muted group-hover:text-primary" />
                            </a>
                            <a href={SHOP_INFO.socialMedia.facebook} className="bg-white/5 hover:bg-primary/20 p-2.5 rounded-full transition-colors group">
                                <Facebook size={20} className="text-muted group-hover:text-primary" />
                            </a>
                            <a href={SHOP_INFO.socialMedia.instagram} className="bg-white/5 hover:bg-primary/20 p-2.5 rounded-full transition-colors group">
                                <Instagram size={20} className="text-muted group-hover:text-primary" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-heading text-lg font-bold text-light uppercase tracking-widest">Quick Links</h4>
                        <ul className="flex flex-col gap-3">
                            {['Home', 'Services', 'Gallery', 'About', 'Contact', 'Book Appointment'].map((item) => {
                                let href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                                if (item === 'Book Appointment') href = '/booking';

                                return (
                                    <li key={item}>
                                        <Link
                                            href={href}
                                            className="text-muted hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full group-hover:w-3 transition-all"></span>
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-heading text-lg font-bold text-light uppercase tracking-widest">Contact Us</h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex gap-3">
                                <MapPin size={20} className="text-primary shrink-0" />
                                <span className="text-muted text-sm leading-relaxed">
                                    {SHOP_INFO.address.full}
                                </span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone size={20} className="text-primary shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm">{SHOP_INFO.phone1}</span>
                                    <span className="text-muted text-sm">{SHOP_INFO.phone2}</span>
                                </div>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail size={20} className="text-primary shrink-0" />
                                <span className="text-muted text-sm">{SHOP_INFO.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-heading text-lg font-bold text-light uppercase tracking-widest">Opening Hours</h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex gap-3">
                                <Clock size={20} className="text-primary shrink-0" />
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col">
                                        <span className="text-light text-sm font-medium">Mon – Sat</span>
                                        <span className="text-muted text-xs">9:00 AM – 7:00 PM</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-light text-sm font-medium">Sunday</span>
                                        <span className="text-muted text-xs">10:00 AM – 4:00 PM</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted text-xs">
                        © {currentYear} {SHOP_INFO.name}. All rights reserved.
                    </p>
                    <p className="text-muted text-[10px] uppercase tracking-[0.2em] ">
                        Design And Developed By <Link href="https://dharmendra-vishvkarma.vercel.app/" target="_blank" className="hover:text-primary hover:underline transition-colors">DharmaByte</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
