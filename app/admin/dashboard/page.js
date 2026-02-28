'use client';
import { useEffect, useState } from 'react';
import { CalendarCheck, Clock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import StatusBadge from '@/components/admin/StatusBadge';

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    setData(result.stats);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="animate-pulse bg-[#1A1A1A] h-32 rounded-xl border border-[#2A2A2A]"></div>)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 animate-pulse bg-[#1A1A1A] h-80 rounded-xl border border-[#2A2A2A]"></div>
                    <div className="animate-pulse bg-[#1A1A1A] h-80 rounded-xl border border-[#2A2A2A]"></div>
                </div>
            </div>
        );
    }

    if (!data) return <div className="text-gray-400">Failed to load stats.</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Total Bookings" value={data.totalBookings} icon={CalendarCheck} color="blue" />
                <StatsCard title="Today's Bookings" value={data.todayBookings} icon={Clock} color="orange" />
                <StatsCard title="Pending" value={data.pendingBookings} icon={AlertCircle} color="yellow" />
                <StatsCard title="Completed" value={data.completedBookings} icon={CheckCircle} color="green" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
                    <h2 className="text-lg font-medium mb-6 text-gray-300">Monthly Bookings</h2>
                    <RevenueChart monthlyData={data.monthlyData} />
                </div>

                <div className="md:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 flex flex-col">
                    <h2 className="text-lg font-medium mb-6 text-gray-300">Quick Stats</h2>
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                            <span className="text-gray-400">Confirmed Bookings</span>
                            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30">{data.confirmedBookings}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                            <span className="text-gray-400">Pending Bookings</span>
                            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-500/30">{data.pendingBookings}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                            <span className="text-gray-400">Completed Bookings</span>
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">{data.completedBookings}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                            <span className="text-gray-400">Cancelled Bookings</span>
                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium border border-red-500/30">{data.cancelledBookings}</span>
                        </div>
                        <div className="flex items-center justify-between pb-3">
                            <span className="text-gray-400">Total Messages</span>
                            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">{data.totalContacts}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-300">Recent Bookings</h2>
                    <Link href="/admin/bookings" className="text-sm text-[#E63946] hover:underline flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#111111] text-gray-500 text-xs font-medium uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3 border-b border-[#2A2A2A]">Customer</th>
                                <th className="px-6 py-3 border-b border-[#2A2A2A]">Bike</th>
                                <th className="px-6 py-3 border-b border-[#2A2A2A]">Date</th>
                                <th className="px-6 py-3 border-b border-[#2A2A2A]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A2A2A]">
                            {data.recentBookings.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No recent bookings.</td></tr>
                            ) : (
                                data.recentBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-[#1F1F1F] transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-white">{booking.customerName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{booking.bikeBrand} {booking.bikeModel}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
