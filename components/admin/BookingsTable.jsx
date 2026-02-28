'use client';
import { Eye, Edit, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function BookingsTable({ bookings = [], onStatusChange, onDelete, onView }) {
    if (bookings.length === 0) {
        return <div className="text-center py-10 text-gray-500 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">No bookings found</div>;
    }

    return (
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#111111] text-gray-400 text-sm font-medium uppercase tracking-wider sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Customer</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Bike</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Date</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Status</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A2A2A]">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-[#1F1F1F] transition-colors">
                                <td className="px-4 py-3 text-sm">
                                    <div className="font-medium text-white">{booking.customerName}</div>
                                    <div className="text-gray-500 text-xs">
                                        <a href={`tel:+91${booking.phone}`} className="hover:text-[#E63946]">{booking.phone}</a>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <span className="bg-[#2A2A2A] px-2 py-1 rounded text-xs text-gray-300">
                                        {booking.bikeBrand} {booking.bikeModel}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-300">
                                    <div>{new Date(booking.createdAt).toLocaleDateString()}</div>
                                    <div className="text-xs text-gray-500">{booking.timeSlot || 'Anytime'}</div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <StatusBadge status={booking.status} />
                                </td>
                                <td className="px-4 py-3 text-sm text-right flex justify-end gap-2">
                                    <button onClick={() => onView(booking)} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 p-2 rounded-lg" title="View details">
                                        <Eye size={16} />
                                    </button>
                                    <select
                                        value={booking.status || 'pending'}
                                        onChange={(e) => onStatusChange(booking._id, e.target.value)}
                                        className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-lg text-xs outline-none px-2 cursor-pointer h-9"
                                    >
                                        <option value="pending" className="bg-[#1A1A1A]">Pending</option>
                                        <option value="confirmed" className="bg-[#1A1A1A]">Confirmed</option>
                                        <option value="completed" className="bg-[#1A1A1A]">Completed</option>
                                        <option value="cancelled" className="bg-[#1A1A1A]">Cancelled</option>
                                    </select>
                                    <button onClick={() => onDelete(booking._id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 p-2 rounded-lg" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden divide-y divide-[#2A2A2A]">
                {bookings.map((booking) => (
                    <div key={booking._id} className="p-4 hover:bg-[#1F1F1F]">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="font-medium text-white">{booking.customerName}</div>
                                <a href={`tel:+91${booking.phone}`} className="text-xs text-gray-500 hover:text-[#E63946]">{booking.phone}</a>
                            </div>
                            <StatusBadge status={booking.status} />
                        </div>
                        <div className="text-sm text-gray-400 mb-3 space-x-2">
                            <span className="bg-[#2A2A2A] px-2 py-1 rounded text-xs text-gray-300">{booking.bikeBrand} {booking.bikeModel}</span>
                            <span className="text-xs">{new Date(booking.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => onView(booking)} className="flex-1 flex items-center justify-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 py-2 rounded-lg text-xs">
                                <Eye size={14} /> View
                            </button>
                            <select
                                value={booking.status || 'pending'}
                                onChange={(e) => onStatusChange(booking._id, e.target.value)}
                                className="flex-[1.5] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 py-2 rounded-lg text-xs text-center outline-none cursor-pointer"
                            >
                                <option value="pending" className="bg-[#1A1A1A]">Pending</option>
                                <option value="confirmed" className="bg-[#1A1A1A]">Confirmed</option>
                                <option value="completed" className="bg-[#1A1A1A]">Completed</option>
                                <option value="cancelled" className="bg-[#1A1A1A]">Cancelled</option>
                            </select>
                            <button onClick={() => onDelete(booking._id)} className="flex-1 flex items-center justify-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 py-2 rounded-lg text-xs">
                                <Trash2 size={14} /> Del
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
