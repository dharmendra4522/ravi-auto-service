'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarCheck, MessageSquare, Settings, ExternalLink, LogOut, Wrench } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminSidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
        { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full bg-[#0A0A0A] w-64 border-r border-[#2A2A2A] text-gray-300">
            <div className="h-16 flex items-center px-6 border-b border-[#2A2A2A]">
                <Link href="/admin/dashboard" className="flex items-center gap-2 group">
                    <Wrench className="text-[#E63946] group-hover:rotate-12 transition-transform" />
                    <span className="text-xl font-bold text-white tracking-wide">Ravi Admin</span>
                </Link>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-[#E63946]/10 text-[#E63946] border-l-2 border-[#E63946]'
                                : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A] border-l-2 border-transparent'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'text-[#E63946]' : 'text-gray-400'} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="pt-6 mt-6 border-t border-[#2A2A2A]">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-[#1A1A1A] transition-colors"
                    >
                        <ExternalLink size={20} />
                        <span className="font-medium">View Website</span>
                    </Link>
                </div>
            </nav>

            <div className="p-4 border-t border-[#2A2A2A]">
                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-[#E63946] hover:bg-[#E63946]/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="hidden md:block h-full z-30">
                {sidebarContent}
            </div>

            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative z-50 h-full w-64 transform transition-transform duration-300 shadow-2xl">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
}
