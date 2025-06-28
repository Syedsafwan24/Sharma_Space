'use client';

import React from 'react';

const MessageCard = ({ message, onMarkAsReadToggle, onReply }) => {
	return (
		<div
			className={`bg-white rounded-lg shadow p-6 border-l-4 ${
				message.read ? 'border-gray-300' : 'border-[#E63946]'
			}`}
		>
			<div className='flex justify-between items-start mb-2'>
				<div>
					<h3 className='text-lg font-semibold text-[#1C1C1C] flex items-center'>
						{message.name}
						{!message.read && (
							<span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E63946] text-white'>
								New
							</span>
						)}
					</h3>
					<p className='text-gray-600 text-sm'>
						{message.email} • {message.phone}
					</p>
				</div>
				<span className='text-gray-500 text-sm flex-shrink-0'>
					{message.dateFormatted}
				</span>
			</div>
			<p className='text-gray-700 mb-4'>{message.message}</p>
			<div className='flex justify-end gap-2'>
				<button
					onClick={() => onReply(message)}
					className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
				>
					Reply
				</button>
				<button
					onClick={() => onMarkAsReadToggle(message.id)}
					className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
				>
					{message.read ? 'Mark as Unread' : 'Mark as Read'}
				</button>
			</div>
		</div>
	);
};

export default MessageCard;
