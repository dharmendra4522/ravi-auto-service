'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { toast } from 'react-hot-toast';

export default function BookingDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/bookings/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setBooking(data.booking);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) setBooking({ ...booking, status: newStatus });
        } catch (err) {
            console.error('Failed to change status');
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setShowDeleteModal(false);
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Booking deleted');
                router.push('/admin/bookings');
            } else {
                toast.error('Failed to delete booking');
            }
        } catch (err) {
            toast.error('Failed to delete booking');
        }
    };

    if (loading) return <div className="animate-pulse bg-[#1A1A1A] h-96 rounded-xl border border-[#2A2A2A]"></div>;
    if (!booking) return <div className="text-gray-400">Booking not found.</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <button onClick={() => router.push('/admin/bookings')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Bookings
            </button>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-[#2A2A2A] gap-4 bg-[#111111]">
                    <div>
                        <h1 className="text-xl font-bold text-white mb-2">Booking #{booking._id.substring(booking._id.length - 8).toUpperCase()}</h1>
                        <p className="text-sm text-gray-500">Created: {new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <StatusBadge status={booking.status} />
                    </div>
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

                <div className="p-6 border-t border-[#2A2A2A] bg-[#111111] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <label className="text-sm text-gray-400">Change Status:</label>
                        <select
                            value={booking.status || 'pending'}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="bg-[#1A1A1A] text-white border border-[#2A2A2A] py-2 px-3 rounded-lg text-sm outline-none cursor-pointer flex-1 md:w-48"
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
                        <button onClick={handleDelete} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors">
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl w-full max-w-sm p-6 flex flex-col items-center text-center shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
                            <Trash2 size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Delete Booking</h3>
                        <p className="text-gray-400 mb-6 text-sm">Are you sure you want to delete this booking? This action cannot be undone.</p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white transition-colors font-medium text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-[#E63946] hover:bg-red-600 text-white transition-colors font-medium text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
