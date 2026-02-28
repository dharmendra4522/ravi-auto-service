import React from 'react';
import ContactForm from '@/components/ContactForm';
import { SHOP_INFO } from '@/lib/constants';
import { MapPin, Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | Ravi Auto Service",
    description: "Get in touch with Ravi Auto Service. Phone, WhatsApp, email, or visit our workshop in Ghansoli Gaon, Navi Mumbai.",
};

const ContactPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
                    <h1 className="font-heading text-5xl md:text-6xl font-bold text-white uppercase italic mb-6">
                        We're Here to <span className="text-primary not-italic">Help</span>
                    </h1>
                    <p className="text-muted text-lg leading-relaxed">
                        Have a question about your bike or want to get a quote? Reach out to us through any of the channels below or fill out the form.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:items-start">
                    {/* Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {/* Location */}
                            <div className="bg-dark-card p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <MapPin className="text-primary" size={24} />
                                </div>
                                <h4 className="text-light font-bold uppercase tracking-widest text-sm mb-3">Our Location</h4>
                                <p className="text-muted text-sm leading-relaxed">{SHOP_INFO.address.full}</p>
                            </div>

                            {/* Phone */}
                            <div className="bg-dark-card p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Phone className="text-primary" size={24} />
                                </div>
                                <h4 className="text-light font-bold uppercase tracking-widest text-sm mb-3">Call Us</h4>
                                <p className="text-muted text-sm">{SHOP_INFO.phone1}</p>
                                <p className="text-muted text-sm">{SHOP_INFO.phone2}</p>
                            </div>

                            {/* WhatsApp */}
                            <a
                                href={SHOP_INFO.socialMedia.whatsapp}
                                className="bg-dark-card p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group"
                            >
                                <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <MessageCircle className="text-[#25D366]" size={24} />
                                </div>
                                <h4 className="text-light font-bold uppercase tracking-widest text-sm mb-3">WhatsApp</h4>
                                <p className="text-muted text-sm">Chat with our experts instantly</p>
                            </a>

                            {/* Hours */}
                            <div className="bg-dark-card p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Clock className="text-primary" size={24} />
                                </div>
                                <h4 className="text-light font-bold uppercase tracking-widest text-sm mb-3">Working Hours</h4>
                                <p className="text-muted text-sm">{SHOP_INFO.workingHours.weekdays}</p>
                                <p className="text-muted text-sm">{SHOP_INFO.workingHours.sunday}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-dark-card border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <h3 className="font-heading text-3xl font-bold text-white uppercase italic mb-8">Send a <span className="text-primary not-italic">Message</span></h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>

                {/* Map Integration */}
                <div className="mt-24 rounded-[3rem] overflow-hidden border border-white/5 grayscale-[0.8] hover:grayscale-0 transition-all duration-1000 h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15077.123456789!2d72.99!3d19.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzE0LjQiTiA3MsKwNTknMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
