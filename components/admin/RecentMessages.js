import React, { useState, useEffect } from 'react';

function RecentMessages() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('/api/messages');
				const data = await response.json();
				setMessages(data.slice(0, 3)); // Get only the first 3 messages
			} catch (error) {
				// Handle error silently
			} finally {
				setLoading(false);
			}
		};

		fetchMessages();
	}, []);

	if (loading) {
		return (
			<div className='bg-white p-6 rounded-lg shadow-md h-full'>
				<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>
					Recent Messages
				</h2>
				<p className='text-gray-600 text-sm mb-6'>
					Latest inquiries from your clients
				</p>
				<div className='space-y-6'>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className='border-b border-gray-200 pb-4 last:border-b-0 last:pb-0'
						>
							<div className='flex justify-between items-center mb-1'>
								<div className='h-4 bg-gray-200 rounded animate-pulse w-1/3'></div>
								<div className='h-3 bg-gray-200 rounded animate-pulse w-1/4'></div>
							</div>
							<div className='h-3 bg-gray-200 rounded animate-pulse w-full'></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md h-full'>
			<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>Recent Messages</h2>
			<p className='text-gray-600 text-sm mb-6'>
				Latest inquiries from your clients
			</p>
			<div className='space-y-6'>
				{messages.length === 0 ? (
					<div className='text-center text-gray-400'>No data available.</div>
				) : (
					messages.map((message, index) => (
						<div
							key={message.id || index}
							className='border-b border-gray-200 pb-4 last:border-b-0 last:pb-0'
						>
							<div className='flex justify-between items-center mb-1'>
								<p className='font-semibold text-gray-800'>{message.name}</p>
								<p className='text-xs text-gray-500'>
									{new Date(message.date).toLocaleDateString()}
								</p>
							</div>
							<p className='text-sm text-gray-700 leading-relaxed'>
								{message.message}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default RecentMessages;
