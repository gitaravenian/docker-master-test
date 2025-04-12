'use client';

import Link from 'next/link';
import { Bell, Settings, LogOut, User } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-[#0a0b2e] text-white border-b border-gray-800">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex justify-between items-center px-6 py-3">
          {/* Left section with logo and title */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-12 w-32">
                <img 
                  src="/logo_ow.webp"
                  alt="IC&I Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-wide">IC&I Admin</span>
                <span className="text-xs text-gray-400">Management Portal</span>
              </div>
            </Link>
          </div>

          {/* Right section with nav items and profile */}
          <div className="flex items-center gap-8">
            {/* Navigation items */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/admin/dashboard" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/blogs" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Blogs
              </Link>
              <Link 
                href="/admin/messages" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Messages
              </Link>
            </nav>

            {/* Action items */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <Link 
                href="/admin/settings"
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <div className="h-6 w-px bg-gray-700"></div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">Admin</span>
                </div>
                <Link 
                  href="/admin/logout"
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}