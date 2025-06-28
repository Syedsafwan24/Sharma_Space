'use client';

import React, { useState } from 'react';

const ReplyMessageForm = ({ message, onClose }) => {
	const [replyText, setReplyText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			`Replying to ${message.name} (${message.email}) with:`,
			replyText
		);
		// In a real application, you would send this reply via an API
		alert(`Reply sent to ${message.name}! (Simulated)`);
		onClose();
	};

	return (
		<div className='p-6'>
			<h2 className='text-2xl font-bold text-[#1C1C1C] mb-4'>
				Reply to {message.name}
			</h2>

			{/* Original Message Display */}
			<div className='mb-6 p-4 bg-gray-50 rounded-md border border-gray-200'>
				<div className='flex justify-between items-start mb-3'>
					<div>
						<p className='text-gray-700 font-semibold'>{message.name}</p>
						<p className='text-gray-600 text-sm'>
							{message.email} • {message.phone}
						</p>
					</div>
					<span className='text-gray-500 text-sm'>{message.dateFormatted}</span>
				</div>

				<div>
					<p className='text-gray-700 font-medium text-sm mb-2'>
						Original Message:
					</p>
					<p className='text-gray-600 text-sm leading-relaxed'>
						{message.message}
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className='mb-6'>
					<label
						htmlFor='replyText'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Your Reply:
					</label>
					<textarea
						id='replyText'
						name='replyText'
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-32 resize-y'
						placeholder='Type your reply here...'
						required
					></textarea>
				</div>

				<div className='flex justify-end gap-4'>
					<button
						type='button'
						onClick={onClose}
						className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='px-6 py-2 bg-[#E63946] hover:bg-[#D62828] text-white rounded-md transition-colors duration-200'
					>
						Send Reply
					</button>
				</div>
			</form>
		</div>
	);
};

export default ReplyMessageForm;
