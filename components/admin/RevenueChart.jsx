'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueChart({ monthlyData = [] }) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formattedData = monthlyData.map(item => ({
        name: monthNames[item._id.month - 1] || 'Unknown',
        count: item.count || 0
    }));

    if (formattedData.length === 0) {
        return <div className="h-[300px] flex items-center justify-center text-gray-500">No data available</div>;
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                        cursor={{ fill: '#2A2A2A' }}
                        contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', color: '#fff', borderRadius: '8px' }}
                        itemStyle={{ color: '#E63946' }}
                    />
                    <Bar dataKey="count" fill="#E63946" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
