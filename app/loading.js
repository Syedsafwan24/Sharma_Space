import React from 'react';

const Loading = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
			<div className='text-center'>
				{/* Main loading spinner */}
				<div className='relative mb-8'>
					<div className='w-20 h-20 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin-smooth mx-auto'></div>
					<div
						className='absolute inset-0 w-20 h-20 border-4 border-transparent border-b-red-400 rounded-full animate-spin-smooth mx-auto'
						style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
					></div>
				</div>

				{/* Loading text */}
				<h2 className='text-2xl font-semibold text-white mb-3'>
					Crafting Your Experience
				</h2>
				<p className='text-gray-400 text-sm max-w-md mx-auto leading-relaxed'>
					Loading beautiful spaces and design inspiration...
				</p>

				{/* Progress bar */}
				<div className='w-64 h-1 bg-gray-700 rounded-full mx-auto mt-6 overflow-hidden'>
					<div className='h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full animate-pulse-subtle'></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
