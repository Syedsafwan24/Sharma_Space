import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Mail, LogOut, Globe } from 'lucide-react';
import { signOut } from 'next-auth/react';

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY]);

  return (
    <div className={`fixed top-0 left-0 right-0 bg-white p-4 flex items-center justify-between shadow-md lg:hidden z-40 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Link href="/admin/dashboard" className="text-xl font-bold text-[#1C1C1C]">Dashboard</Link>
      <div className="flex items-center gap-4">
        <Link href="/admin/messages" className="text-gray-600 hover:text-[#E63946]">
          <Mail size={24} />
        </Link>
        <button ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#E63946]">
          <Menu size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 z-50">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-700 hover:text-[#E63946]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe size={20} />
                Back to Website
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/login' });
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-[#E63946] w-full text-left"
              >
                <LogOut size={20} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
