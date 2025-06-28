// components/blog/BlogContent.jsx
import React from 'react';

const BlogContent = ({ content }) => {
	let parsedContent = content;

	// Try to parse if it's a JSON array string
	if (
		typeof content === 'string' &&
		content.trim().startsWith('[') &&
		content.trim().endsWith(']')
	) {
		try {
			parsedContent = JSON.parse(content);
		} catch {
			parsedContent = content;
		}
	}

	if (!parsedContent) {
		return (
			<div className='prose prose-lg max-w-none text-gray-700'>
				<p>No content available.</p>
			</div>
		);
	}

	if (Array.isArray(parsedContent)) {
		return (
			<div className='prose prose-lg max-w-none text-gray-700 [&_h2]:mt-12 [&_h2]:mb-6 [&_p]:mb-6'>
				{parsedContent.map((block, index) => (
					<React.Fragment key={index}>
						{block.type === 'heading' && <h2>{block.text}</h2>}
						{block.type === 'paragraph' && <p>{block.text}</p>}
						{/* Add more block types as needed */}
					</React.Fragment>
				))}
			</div>
		);
	}

	// If content is a string
	if (typeof parsedContent === 'string') {
		// If it looks like HTML, render as HTML
		if (
			parsedContent.trim().startsWith('<') &&
			parsedContent.trim().endsWith('>')
		) {
			return (
				<div
					className='prose prose-lg max-w-none text-gray-700 [&_h2]:mt-12 [&_h2]:mb-6 [&_p]:mb-6'
					dangerouslySetInnerHTML={{ __html: parsedContent }}
				/>
			);
		}
		// Otherwise, render as plain text
		return (
			<div className='prose prose-lg max-w-none text-gray-700 [&_h2]:mt-12 [&_h2]:mb-6 [&_p]:mb-6'>
				<p>{parsedContent}</p>
			</div>
		);
	}

	// Fallback
	return (
		<div className='prose prose-lg max-w-none text-gray-700'>
			<p>Unsupported content format.</p>
		</div>
	);
};

export default BlogContent;
