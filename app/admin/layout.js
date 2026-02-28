'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

function AdminLayoutContent({ children }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (status === 'unauthenticated' && !isLoginPage) {
            router.push('/admin/login');
        }
    }, [status, isLoginPage, router]);

    if (status === 'loading') {
        return <div className="fixed inset-0 z-[9999] bg-[#0D0D0D] flex items-center justify-center"><div className="animate-pulse text-[#E63946]">Loading...</div></div>;
    }

    if (isLoginPage) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#0D0D0D] text-white overflow-auto">
                {children}
            </div>
        );
    }

    if (!session) return <div className="fixed inset-0 z-[9999] bg-[#0D0D0D]"></div>;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#0D0D0D] text-white flex h-screen overflow-hidden">
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 scroll-smooth bg-[#0D0D0D]">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}
