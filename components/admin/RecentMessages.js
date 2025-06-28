import React from 'react';
import { contactMessages } from '@/app/data';

function RecentMessages() {
	return (
		<div className='bg-white p-6 rounded-lg shadow-md h-full'>
			<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>Recent Messages</h2>
			<p className='text-gray-600 text-sm mb-6'>
				Latest inquiries from your clients
			</p>
			<div className='space-y-6'>
				{contactMessages.slice(0, 3).map((message, index) => (
					<div
						key={index}
						className='border-b border-gray-200 pb-4 last:border-b-0 last:pb-0'
					>
						<div className='flex justify-between items-center mb-1'>
							<p className='font-semibold text-gray-800'>{message.name}</p>
							<p className='text-xs text-gray-500'>{message.dateFormatted}</p>
						</div>
						<p className='text-sm text-gray-700 leading-relaxed'>
							{message.message}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecentMessages;
