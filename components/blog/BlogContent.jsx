// components/blog/BlogContent.jsx
import React from 'react';

const BlogContent = ({ content }) => {
	if (!content || content.length === 0) return null; // Don't render if no content

	return (
		// Outer container for width and horizontal padding
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
			{/* Tailwind Typography plugin's prose classes for semantic styling */}
			<div className='prose prose-lg max-w-none text-gray-700'>
				{content.map((block, index) => (
					<React.Fragment key={index}>
						{block.type === 'paragraph' && (
							// Let prose-lg handle paragraph styling (font size, line height, margin)
							<p>{block.text}</p>
						)}
						{block.type === 'heading' && (
							// Custom heading styling, overriding prose's default h2 if needed
							<h2 className='text-3xl font-bold text-gray-900 mt-10 mb-6'>
								{block.text}
							</h2>
						)}
						{/* Add more block types (e.g., 'image', 'list', 'blockquote') as needed here */}
						{/* Example for an image block (assuming block.src and block.alt) */}
						{/*
            {block.type === 'image' && (
              <figure className="my-8">
                <Image
                  src={block.src}
                  alt={block.alt || 'Blog image'}
                  width={block.width || 800} // Provide sensible defaults or get from content
                  height={block.height || 500}
                  className="rounded-lg object-cover w-full"
                />
                {block.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{block.caption}</figcaption>}
              </figure>
            )}
            */}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default BlogContent;
