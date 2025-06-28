'use client'; // This component will use client-side hooks like useState and useEffect

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, Sparkles } from 'lucide-react'; // Minimal icons

const WelcomeModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		// Check localStorage to see if the modal has been dismissed permanently
		const hasDismissed = localStorage.getItem('sharmaspace_modal_dismissed');
		// Check if the modal has been shown in this session (simple session check)
		const hasShownThisSession = sessionStorage.getItem(
			'sharmaspace_modal_shown_session'
		);

		// Show the modal only if it hasn't been dismissed permanently and not shown this session
		if (!hasDismissed && !hasShownThisSession) {
			const timer = setTimeout(() => {
				setIsOpen(true);
				setIsAnimating(true);
				sessionStorage.setItem('sharmaspace_modal_shown_session', 'true'); // Mark as shown for this session
			}, 800);
			return () => clearTimeout(timer);
		}
	}, []);

	// Effect to manage body scrolling when modal opens/closes
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	const handleClose = () => {
		setIsAnimating(false);
		setTimeout(() => setIsOpen(false), 300);
	};

	const handleMaybeLater = () => {
		setIsAnimating(false);
		setTimeout(() => setIsOpen(false), 300);
	};

	const handleDontShowAgain = () => {
		setIsAnimating(false);
		setTimeout(() => setIsOpen(false), 300);
		localStorage.setItem('sharmaspace_modal_dismissed', 'true');
	};

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300 ${
				isAnimating ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div
				className={`bg-white rounded-xl shadow-xl max-w-sm w-full mx-auto relative overflow-hidden transform transition-all duration-300 ease-out ${
					isAnimating
						? 'scale-100 opacity-100 translate-y-0'
						: 'scale-95 opacity-0 translate-y-4'
				}`}
			>
				{/* Close Button */}
				<button
					onClick={handleClose}
					className='absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600 transition-colors duration-200'
					aria-label='Close Welcome Message'
				>
					<X size={18} />
				</button>

				{/* Header */}
				<div className='bg-gradient-to-r from-red-600 to-red-700 text-white p-6 text-center relative'>
					<div className='absolute top-2 right-8 opacity-20'>
						<Sparkles size={16} />
					</div>
					<h2 className='text-xl font-bold mb-1'>Welcome to Sharma Space!</h2>
					<p className='text-sm text-red-100'>Transform Your Space</p>
				</div>

				{/* Body */}
				<div className='p-6 text-center'>
					<p className='text-sm text-gray-600 mb-4 leading-relaxed'>
						Get a{' '}
						<span className='font-semibold text-red-600'>
							free consultation
						</span>{' '}
						with our expert designers.
					</p>

					{/* CTA Button */}
					<Link
						href='#'
						onClick={handleClose}
						className='inline-flex items-center justify-center w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 text-sm shadow-md mb-4'
					>
						<Phone size={16} className='mr-2' />
						Get Free Consultation
					</Link>

					{/* Action buttons */}
					<div className='flex justify-center gap-4 text-xs'>
						<button
							onClick={handleMaybeLater}
							className='text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200'
						>
							Maybe Later
						</button>
						<button
							onClick={handleDontShowAgain}
							className='text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200'
						>
							Don't Show Again
						</button>
					</div>
				</div>

				{/* Footer Contact */}
				<div className='border-t border-gray-100 bg-gray-50 p-4 text-center'>
					<a
						href='tel:+919876543210'
						className='text-xs text-gray-600 hover:text-red-600 transition-colors duration-200'
					>
						📞 +91 98765 43210
					</a>
				</div>
			</div>
		</div>
	);
};

export default WelcomeModal;
