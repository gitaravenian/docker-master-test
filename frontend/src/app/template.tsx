"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isBlogPostPage = pathname?.startsWith('/blogs/') && pathname !== '/blogs';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminPage && !isBlogPostPage && <Footer />}
    </div>
  );
}
