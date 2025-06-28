'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlusCircle, MinusCircle, X } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const ImageInput = ({ label, imageUrl, onImageUrlChange, onRemove, showRemove = false }) => {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="flex-1">
        <label className="block text-[#1C1C1C] text-xs font-semibold mb-2">{label}</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => onImageUrlChange(e.target.value)}
          className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
          placeholder="Enter image URL"
        />
      </div>
      {imageUrl && (
        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-[#EDEDED]">
          <Image src={imageUrl} alt="Preview" width={64} height={64} className="object-cover w-full h-full" />
        </div>
      )}
      {showRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-[#E63946] transition-colors duration-200"
        >
          <MinusCircle size={18} />
        </button>
      )}
    </div>
  );
};

const EditBlogForm = ({ blogPost, onClose }) => {
  const isEditMode = !!blogPost;
  const [formData, setFormData] = useState({
    title: blogPost?.title || '',
    category: blogPost?.category || '',
    date: blogPost?.date || '',
    excerpt: blogPost?.excerpt || '',
    content: blogPost?.content || '',
    author: blogPost?.author || '',
    authorImage: blogPost?.authorImage || '',
    image: blogPost?.image || '',
    galleryImages: blogPost?.galleryImages || [],
    ctaTitle: blogPost?.ctaTitle || '',
    ctaButtonText: blogPost?.ctaButtonText || '',
    ctaDescription: blogPost?.ctaDescription || '',
    ctaButtonLink: blogPost?.ctaButtonLink || '',
  });

  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGalleryImage = () => {
    if (newGalleryImageUrl.trim() && !formData.galleryImages.includes(newGalleryImageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, newGalleryImageUrl.trim()],
      }));
      setNewGalleryImageUrl('');
    }
  };

  const handleRemoveGalleryImage = (imageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((image) => image !== imageToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="bg-[#F8F9FA] p-0 rounded-xl">
      <div className="px-8 pt-8 pb-2">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-1">{isEditMode ? 'Edit Blog Post' : 'New Blog Post'}</h2>
        <p className="text-gray-500 text-sm mb-6">{isEditMode ? 'Update the details of your blog post.' : 'Fill in the details for the new blog post.'}</p>
      </div>
      <form onSubmit={handleSubmit} className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="title" className="block text-[#1C1C1C] text-xs font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-[#1C1C1C] text-xs font-semibold mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
            >
              <option value="">Select Category</option>
              <option value="TRENDS">Trends</option>
              <option value="GUIDES">Guides</option>
              <option value="TIPS">Tips</option>
            </select>
          </div>
          <div>
            <label htmlFor="author" className="block text-[#1C1C1C] text-xs font-semibold mb-2">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-[#1C1C1C] text-xs font-semibold mb-2">Publish Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <ImageInput
            label="Featured Image URL"
            imageUrl={formData.image}
            onImageUrlChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
          />
          <ImageInput
            label="Author Image URL"
            imageUrl={formData.authorImage}
            onImageUrlChange={(url) => setFormData((prev) => ({ ...prev, authorImage: url }))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-[#1C1C1C] text-xs font-semibold mb-2">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm h-20 resize-none"
            placeholder="A short summary of the blog post"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-[#1C1C1C] text-xs font-semibold mb-2">Content</label>
          <div className="w-full">
            <Editor
              id="content"
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || ''}
              value={formData.content}
              onEditorChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              init={{
                height: 260,
                width: '100%',
                menubar: 'file edit view insert format tools table help',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image media | table | code | fullscreen',
                content_style:
                  'body { background: #fff; color: #1C1C1C; font-family: inherit; font-size: 14px; }',
                skin: false,
                content_css: false,
                branding: false,
                elementpath: false,
                statusbar: true,
                quickbars_selection_toolbar: false,
                quickbars_insert_toolbar: false,
                contextmenu: false,
                toolbar_sticky: false,
                resize: false,
              }}
              textareaName="content"
            />
          </div>
        </div>
        {/* Gallery Images Section */}
        <div className="mb-6 p-6 border border-[#EDEDED] rounded-lg bg-[#F8F9FA]">
          <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Gallery Images</h3>
          <p className="text-gray-500 text-xs mb-4">Add multiple images to display in a gallery within the blog post.</p>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={newGalleryImageUrl}
              onChange={(e) => setNewGalleryImageUrl(e.target.value)}
              className="flex-1 px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
              placeholder="Enter image URL"
            />
            <button
              type="button"
              onClick={handleAddGalleryImage}
              className="px-5 py-2 bg-[#E63946] hover:bg-[#D62828] text-white rounded-md font-semibold text-sm transition-colors duration-200"
            >
              Add Image
            </button>
          </div>
          {formData.galleryImages.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No gallery images added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-md overflow-hidden border border-[#EDEDED] bg-white">
                  <Image src={img} alt={`Gallery ${idx + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(img)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 text-gray-400 hover:text-[#E63946] shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* CTA Section */}
        <div className="mb-6 p-6 border border-[#EDEDED] rounded-lg bg-[#F8F9FA]">
          <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Call-to-Action Box</h3>
          <p className="text-gray-500 text-xs mb-4">Add a custom CTA box that will appear at the end of the blog post.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#1C1C1C] text-xs font-semibold mb-2">CTA Title</label>
              <input
                type="text"
                name="ctaTitle"
                value={formData.ctaTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
                placeholder="Enter CTA title"
              />
            </div>
            <div>
              <label className="block text-[#1C1C1C] text-xs font-semibold mb-2">Button Text</label>
              <input
                type="text"
                name="ctaButtonText"
                value={formData.ctaButtonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
                placeholder="Enter button text"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[#1C1C1C] text-xs font-semibold mb-2">CTA Description</label>
            <textarea
              name="ctaDescription"
              value={formData.ctaDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm h-16 resize-none"
              placeholder="Enter CTA description"
            ></textarea>
          </div>
          <div>
            <label className="block text-[#1C1C1C] text-xs font-semibold mb-2">Button Link</label>
            <input
              type="text"
              name="ctaButtonLink"
              value={formData.ctaButtonLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm"
              placeholder="Enter button link (URL)"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-[#1C1C1C] bg-transparent rounded-md font-semibold text-sm border border-transparent hover:underline hover:bg-[#EDEDED] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-[#E63946] hover:bg-[#D62828] text-white rounded-md font-bold text-sm shadow-sm transition-colors duration-200"
          >
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogForm;
