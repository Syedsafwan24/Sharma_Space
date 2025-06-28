'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Folder, Settings, FileText, MessageSquare, Mail, LogOut, Globe } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Folder },
    { name: 'Services', href: '/admin/services', icon: Settings },
    { name: 'Blog Posts', href: '/admin/blog-posts', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
  ];

  return (
    <>
      <div className="w-64 bg-white shadow-md lg:h-screen hidden lg:flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E63946] rounded-md flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold text-[#1C1C1C]">Sharma Space</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-6 py-3 text-base font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-[#EDEDED] text-[#E63946]'
                        : 'text-gray-700 hover:bg-[#EDEDED]'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-3 w-full px-6 py-3 text-base font-medium text-gray-700 hover:bg-[#EDEDED] transition-colors duration-200 rounded-md"
          >
            <LogOut size={20} />
            Logout
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-6 py-3 text-base font-medium text-gray-700 hover:bg-[#EDEDED] transition-colors duration-200 rounded-md mt-2"
          >
            <Globe size={20} />
            Back to Website
          </Link>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.filter(item => item.name !== 'Messages').map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center text-xs font-medium h-full w-full ${
              pathname === item.href
                ? 'text-[#E63946]'
                : 'text-gray-500 hover:text-[#E63946]'
            }`}
          >
            <item.icon size={20} />
          </Link>
        ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
