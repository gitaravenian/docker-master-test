'use client';

import Link from 'next/link';

export default function AdminFooter() {
  return (
    <footer className="bg-[#0a0b2e] text-white py-6 px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-sm text-gray-400">
            {new Date().getFullYear()} IC&I Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
