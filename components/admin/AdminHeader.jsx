'use client';
import { Menu, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function AdminHeader({ sidebarOpen, setSidebarOpen, title = "Admin Panel" }) {
    const { data: session } = useSession();

    return (
        <header className="bg-[#0D0D0D] border-b border-[#2A2A2A] h-16 flex items-center justify-between px-4 md:px-6 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden text-gray-400 hover:text-white"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-white">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E63946] flex items-center justify-center text-white font-bold">
                        {session?.user?.name?.charAt(0) || 'A'}
                    </div>
                    <span className="text-sm font-medium pr-2 text-white">{session?.user?.name || 'Admin'}</span>
                </div>

                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#E63946] transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                    <span className="hidden md:inline text-sm">Logout</span>
                </button>
            </div>
        </header>
    );
}
