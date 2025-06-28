'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, Youtube, Twitter, Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const Navigation = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const { data: session } = useSession();

	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: '/about' },
		{ name: 'Services', path: '/services' },
		{ name: 'Portfolio', path: '/portfolio' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'Contact', path: '/contact' },
	];

	// Check if we're on a light background page
	const isLightPage =
		pathname.includes('/blog/') || pathname.includes('/portfolio/');

	// Should use dark theme when scrolled OR on light pages
	const useDarkTheme = isScrolled || isLightPage;

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu when route changes
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Debug (remove after testing)
	console.log('Debug:', { pathname, isLightPage, useDarkTheme, isScrolled });

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 py-3 z-50 transition-all duration-500 ease-in-out ${
					useDarkTheme
						? 'bg-white backdrop-blur-md border-gray-200/30 shadow-sm'
						: 'bg-transparent'
				}`}
			>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center'>
					{/* Logo */}
					{/* Added Link component around the logo and text */}
					<Link
						href='/'
						className='flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-pointer'
					>
						<img
							src='/images/icon/SharmaSpace-Logo.png'
							alt='SharmaSpace Logo'
							className='w-8 h-8 sm:w-10 sm:h-10 rounded'
						/>
						<span
							className='text-lg sm:text-xl font-bold'
							style={{ color: useDarkTheme ? '#1f2937' : '#ffffff' }}
						>
							Sharma Space
						</span>
					</Link>

					{/* Desktop Navigation */}
					<ul className='hidden lg:flex list-none m-0 p-0 gap-6 xl:gap-8'>
						{navItems.map((item) => (
							<li key={item.name}>
								<Link href={item.path}>
									{/* Adjusted styles for hover effect */}
									<span
										className={`no-underline font-medium transition-all duration-300 text-base relative hover:-translate-y-0.5 cursor-pointer
											${pathname === item.path ? 'text-red-600' : ''}
											${
												useDarkTheme
													? 'text-gray-700 hover:text-red-600'
													: 'text-white hover:text-red-600'
											}
										`}
									>
										{item.name}
									</span>
								</Link>
							</li>
						))}
					</ul>

					{/* Desktop Social Icons */}
					<div className='hidden md:flex gap-3 lg:gap-4'>
						{[
							{ Icon: Instagram, href: '#' },
							{ Icon: Facebook, href: '#' },
							{ Icon: Youtube, href: '#' },
							{ Icon: Twitter, href: '#' },
						].map(({ Icon, href }, index) => (
							<Link key={index} href={href}>
								<Icon
									size={20}
									className='transition-all duration-300 p-1 hover:scale-110 cursor-pointer'
									style={{ color: useDarkTheme ? '#1f2937' : '#ffffff' }}
								/>
							</Link>
						))}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMobileMenu}
						className='lg:hidden p-2 rounded-md transition-colors duration-300'
						style={{
							color: useDarkTheme ? '#1f2937' : '#ffffff',
							backgroundColor: 'transparent',
						}}
						aria-label='Toggle mobile menu'
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 bg-black/50 z-40 lg:hidden'
					onClick={toggleMobileMenu}
				/>
			)}

			{/* Mobile Menu */}
			<div
				className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
					isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Mobile Menu Header */}
				<div className='flex justify-between items-center p-6 border-b border-gray-200'>
					<div className='flex items-center gap-2'>
						<img
							src='/images/icon/SharmaSpace-Logo.png'
							alt='SharmaSpace Logo'
							className='w-8 h-8 rounded'
						/>
						<span className='text-lg font-bold text-gray-900'>
							Sharma Space
						</span>
					</div>
					<button
						onClick={toggleMobileMenu}
						className='p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100'
						aria-label='Close mobile menu'
					>
						<X size={24} />
					</button>
				</div>

				{/* Mobile Navigation Items */}
				<div className='py-6'>
					<ul className='space-y-1'>
						{navItems.map((item) => (
							<li key={item.name}>
								<Link href={item.path}>
									<span
										className={`block px-6 py-3 text-base font-medium transition-colors duration-200 ${
											pathname === item.path
												? 'text-red-600 bg-red-50 border-r-4 border-red-600'
												: 'text-gray-900 hover:text-red-600 hover:bg-gray-50'
										}`}
									>
										{item.name}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Mobile Social Icons */}
				<div className='absolute bottom-6 left-6 right-6'>
					<div className='flex justify-center gap-6 pt-6 border-t border-gray-200'>
						{[
							{ Icon: Instagram, href: '#' },
							{ Icon: Facebook, href: '#' },
							{ Icon: Youtube, href: '#' },
							{ Icon: Twitter, href: '#' },
						].map(({ Icon, href }, index) => (
							<Link key={index} href={href}>
								<Icon
									size={24}
									className='text-gray-600 hover:text-red-600 transition-colors duration-300 p-1 hover:scale-110'
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
