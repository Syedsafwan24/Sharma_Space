// components/blog/BlogContent.jsx
import React from 'react';

const BlogContent = ({ content }) => {
	// Debug log to check the type and value
	if (typeof window !== 'undefined') {
		console.log(
			'BlogContent received:',
			content,
			typeof content,
			Array.isArray(content)
		);
	}

	if (!content) {
		return (
			<div className='prose prose-lg max-w-none text-gray-700'>
				<p>No content available.</p>
			</div>
		);
	}

	// If content is an array, join it into a string
	let html = Array.isArray(content) ? content.join('') : content;

	return (
		<div className='prose prose-lg max-w-none text-gray-700'>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
};

export default BlogContent;
