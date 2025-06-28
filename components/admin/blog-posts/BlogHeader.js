import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

const BlogHeader = ({ onAddBlogPostClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1C1C1C]">Blog Posts</h1>
        <p className="text-gray-600">Manage your blog content</p>
      </div>
      <button
        onClick={onAddBlogPostClick}
        className="bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200 hidden lg:flex"
      >
        <PlusCircle size={20} />
        New Blog Post
      </button>
    </div>
  );
};

export default BlogHeader;
