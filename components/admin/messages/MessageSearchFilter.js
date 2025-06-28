'use client';

import React from 'react';

const MessageSearchFilter = ({
	searchTerm,
	setSearchTerm,
	filter,
	setFilter,
	unreadCount,
	readCount,
}) => {
	return (
		<div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
			<div className='flex space-x-2 bg-gray-100 p-1 rounded-md'>
				<button
					onClick={() => setFilter('All')}
					className={`px-4 py-2 rounded-md text-sm font-medium ${
						filter === 'All'
							? 'bg-white shadow text-[#E63946]'
							: 'text-gray-600 hover:bg-gray-200'
					}`}
				>
					All{' '}
					{unreadCount + readCount > 0 && (
						<span className='ml-1'>{unreadCount + readCount}</span>
					)}
				</button>
				<button
					onClick={() => setFilter('Unread')}
					className={`px-4 py-2 rounded-md text-sm font-medium ${
						filter === 'Unread'
							? 'bg-white shadow text-[#E63946]'
							: 'text-gray-600 hover:bg-gray-200'
					}`}
				>
					Unread{' '}
					{unreadCount > 0 && <span className='ml-1'>{unreadCount}</span>}
				</button>
				<button
					onClick={() => setFilter('Read')}
					className={`px-4 py-2 rounded-md text-sm font-medium ${
						filter === 'Read'
							? 'bg-white shadow text-[#E63946]'
							: 'text-gray-600 hover:bg-gray-200'
					}`}
				>
					Read {readCount > 0 && <span className='ml-1'>{readCount}</span>}
				</button>
			</div>
			<input
				type='text'
				placeholder='Search messages...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
			/>
		</div>
	);
};

export default MessageSearchFilter;
