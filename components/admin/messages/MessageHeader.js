'use client';

import React from 'react';

const MessageHeader = () => {
	return (
		<div className='flex justify-between items-center mb-6'>
			<div>
				<h1 className='text-3xl font-bold text-[#1C1C1C]'>Messages</h1>
				<p className='text-gray-600'>
					View and manage client inquiries and messages
				</p>
			</div>
		</div>
	);
};

export default MessageHeader;
