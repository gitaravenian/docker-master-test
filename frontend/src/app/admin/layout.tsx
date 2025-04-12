'use client';

import { usePathname } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't show admin layout for login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#070817]">
            <AdminHeader />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}