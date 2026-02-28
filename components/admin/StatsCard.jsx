export default function StatsCard({ title, value, icon: Icon, color }) {
    const colorMap = {
        red: 'bg-red-500/20 text-red-500',
        orange: 'bg-orange-500/20 text-orange-500',
        green: 'bg-green-500/20 text-green-500',
        blue: 'bg-blue-500/20 text-blue-500',
        yellow: 'bg-yellow-500/20 text-yellow-500',
    };

    return (
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 xl:p-6 hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-start justify-between gap-2 mb-2 lg:mb-4">
                <h3 className="text-gray-400 font-medium text-xs sm:text-sm md:text-base break-words mt-1">{title}</h3>
                <div className={`p-2 xl:p-3 rounded-full shrink-0 ${colorMap[color] || 'bg-gray-500/20 text-gray-500'}`}>
                    <Icon className="w-5 h-5 xl:w-6 xl:h-6" />
                </div>
            </div>
            <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}
