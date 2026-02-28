'use client';
import { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';
import BookingsTable from '@/components/admin/BookingsTable';
import BookingDetailModal from '@/components/admin/BookingDetailModal';
import { toast } from 'react-hot-toast';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/bookings?page=${page}&status=${statusFilter}&search=${debouncedSearch}`);
                const data = await res.json();
                if (data.success) {
                    setBookings(data.bookings);
                    setTotal(data.total);
                    setTotalPages(data.totalPages);
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchBookings();
    }, [page, statusFilter, debouncedSearch]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
                if (selectedBooking && selectedBooking._id === id) {
                    setSelectedBooking({ ...selectedBooking, status: newStatus });
                }
            }
        } catch (err) {
            console.error('Failed to change status');
        }
    };

    const [bookingToDelete, setBookingToDelete] = useState(null);

    const handleDelete = (id) => {
        setBookingToDelete(id);
    };

    const confirmDelete = async () => {
        if (!bookingToDelete) return;
        const id = bookingToDelete;
        setBookingToDelete(null);
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBookings(prev => prev.filter(item => item._id !== id));
                setTotal(prev => prev - 1);
                toast.success('Booking deleted');
            } else {
                toast.error('Failed to delete booking');
            }
        } catch (err) {
            toast.error('Failed to delete booking');
        }
    };

    const handleView = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold">Bookings</h1>
                <div className="bg-[#1A1A1A] text-gray-400 px-4 py-2 rounded-full border border-[#2A2A2A] text-sm font-medium">
                    {total} bookings
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-[#111] border border-[#2A2A2A] text-white text-sm rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#E63946]"
                        placeholder="Search name, phone, bike..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 filter-scroll" style={{ scrollbarWidth: 'none' }}>
                    {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => { setStatusFilter(status); setPage(1); }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap capitalize transition-colors ${statusFilter === status
                                ? 'bg-[#E63946] text-white border border-[#E63946]'
                                : 'bg-[#111] text-gray-400 border border-[#2A2A2A] hover:bg-[#1A1A1A] hover:text-white'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse bg-[#1A1A1A] h-[500px] rounded-xl border border-[#2A2A2A]"></div>
            ) : (
                <BookingsTable
                    bookings={bookings}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}

            {!loading && totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                    <span className="text-sm text-gray-400">
                        Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} bookings
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-3 py-1 rounded-lg text-sm border border-[#2A2A2A] bg-[#111] text-gray-300 disabled:opacity-50 hover:bg-[#1A1A1A]"
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            if (totalPages > 5 && i > 0 && i < totalPages - 1 && Math.abs(page - 1 - i) > 1) {
                                if (i === 1 || i === totalPages - 2) return <span key={i} className="text-gray-500">...</span>;
                                return null;
                            }
                            return (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${page === i + 1 ? 'bg-[#E63946] text-white' : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#2A2A2A] border border-[#2A2A2A]'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="px-3 py-1 rounded-lg text-sm border border-[#2A2A2A] bg-[#111] text-gray-300 disabled:opacity-50 hover:bg-[#1A1A1A]"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <BookingDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                booking={selectedBooking}
                onStatusChange={handleStatusChange}
            />

            {bookingToDelete && (
                <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl w-full max-w-sm p-6 flex flex-col items-center text-center shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
                            <Trash2 size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Delete Booking</h3>
                        <p className="text-gray-400 mb-6 text-sm">Are you sure you want to delete this booking? This action cannot be undone.</p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setBookingToDelete(null)}
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
