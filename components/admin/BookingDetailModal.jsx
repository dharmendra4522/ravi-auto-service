'use client';
import { X, MessageCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useEffect } from 'react';

export default function BookingDetailModal({ booking, isOpen, onClose, onStatusChange }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !booking) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={handleBackdropClick}>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A] sticky top-0 bg-[#1A1A1A] z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-white">Booking Details</h2>
                        <StatusBadge status={booking.status} />
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white bg-[#2A2A2A] p-2 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Customer Info</h3>
                            <div className="bg-[#111111] p-4 rounded-xl border border-[#2A2A2A]">
                                <p className="text-lg text-white font-medium mb-1">{booking.customerName}</p>
                                <a href={`tel:+91${booking.phone}`} className="text-[#E63946] hover:underline block mb-1">{booking.phone}</a>
                                <p className="text-gray-400 text-sm">{booking.email || 'No email provided'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Bike Info</h3>
                            <div className="bg-[#111111] p-4 rounded-xl border border-[#2A2A2A]">
                                <p className="text-lg text-white font-medium mb-1">{booking.bikeBrand}</p>
                                <p className="text-gray-400">{booking.bikeModel}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Service Request</h3>
                        <div className="bg-[#111111] p-4 rounded-xl border border-[#2A2A2A]">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {(booking.services || []).map((service, i) => (
                                    <span key={i} className="bg-[#2A2A2A] text-gray-300 px-3 py-1 rounded-full text-xs">
                                        {service}
                                    </span>
                                ))}
                            </div>
                            <div>
                                <strong className="text-gray-400 text-sm block mb-1">Issue Description:</strong>
                                <p className="text-gray-300">{booking.description || 'No specific issue mentioned.'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Schedule</h3>
                        <div className="bg-[#111111] p-4 rounded-xl border border-[#2A2A2A] grid grid-cols-2 gap-4">
                            <div>
                                <strong className="text-gray-400 text-sm block mb-1">Date</strong>
                                <p className="text-white">{new Date(booking.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <strong className="text-gray-400 text-sm block mb-1">Time Slot</strong>
                                <p className="text-white">{booking.timeSlot || 'Any time'}</p>
                            </div>
                            <div className="col-span-2 mt-2 pt-4 border-t border-[#2A2A2A]">
                                <strong className="text-gray-400 text-sm block mb-1">Home Pickup</strong>
                                <p className="text-white">
                                    {booking.isPickup ? (
                                        <span className="text-green-400 font-medium">Yes - {booking.address || 'Address not listed'}</span>
                                    ) : (
                                        'No - Customer will drop off'
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-[#2A2A2A] bg-[#111111] sticky bottom-0 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <label className="text-sm text-gray-400">Status:</label>
                        <select
                            value={booking.status || 'pending'}
                            onChange={(e) => onStatusChange(booking._id, e.target.value)}
                            className="bg-[#1A1A1A] text-white border border-[#2A2A2A] py-2 px-3 rounded-lg text-sm outline-none cursor-pointer flex-1 md:w-32"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <a
                            href={`https://wa.me/91${booking.phone}?text=Hello ${booking.customerName}, your booking at Ravi Auto Service is now ${booking.status}. - Team Ravi Auto Service`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1DA851] transition-colors"
                        >
                            <MessageCircle size={18} /> WhatsApp
                        </a>
                        <button onClick={onClose} className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-[#2A2A2A] text-gray-300 hover:bg-[#2A2A2A] transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
