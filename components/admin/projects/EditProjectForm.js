'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlusCircle, MinusCircle } from 'lucide-react';

const ImageInput = ({ label, imageUrl, onImageUrlChange, onRemove, showRemove = false }) => {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="flex-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => onImageUrlChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
          placeholder="Enter image URL"
        />
      </div>
      {imageUrl && (
        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
          <Image src={imageUrl} alt="Preview" width={80} height={80} className="object-cover w-full h-full" />
        </div>
      )}
      {showRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-gray-500 hover:text-[#E63946] transition-colors duration-200"
        >
          <MinusCircle size={20} />
        </button>
      )}
    </div>
  );
};

const EditProjectForm = ({ project, onClose }) => {
  const isEditMode = !!project;
  const [formData, setFormData] = useState({
    title: project?.title || '',
    location: project?.location || '',
    category: project?.category || '',
    description: project?.description || '',
    client: project?.client || '',
    completionDate: project?.completionDate || '',
    area: project?.area || '',
    videoWalkthrough: project?.videoWalkthrough || '',
    mainImageUrl: project?.mainImageUrl || '',
    additionalImages: project?.additionalImages || [''],
    renderImages: project?.renderImages || [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (type, index, value) => {
    setFormData((prev) => {
      const newImages = [...prev[type]];
      newImages[index] = value;
      return { ...prev, [type]: newImages };
    });
  };

  const handleAddImage = (type) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ''] }));
  };

  const handleRemoveImage = (type, index) => {
    setFormData((prev) => {
      const newImages = prev[type].filter((_, i) => i !== index);
      return { ...prev, [type]: newImages.length > 0 ? newImages : [''] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditMode ? 'Form submitted for edit:' : 'Form submitted for add:', formData);
    // Here you would typically send data to your backend
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">{isEditMode ? 'Edit Project' : 'Add Project'}</h2>
      <p className="text-gray-600 mb-6">{isEditMode ? 'Update the details for this portfolio project.' : 'Fill in the details for the new portfolio project.'}</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
          >
            <option value="">Select Category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Hospitality">Hospitality</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-32 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="client" className="block text-gray-700 text-sm font-bold mb-2">Client (Optional)</label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
            />
          </div>
          <div>
            <label htmlFor="completionDate" className="block text-gray-700 text-sm font-bold mb-2">Completion Date (Optional)</label>
            <input
              type="date"
              id="completionDate"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">Area (Optional)</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
            />
          </div>
          <div>
            <label htmlFor="videoWalkthrough" className="block text-gray-700 text-sm font-bold mb-2">Video Walkthrough URL (Optional)</label>
            <input
              type="text"
              id="videoWalkthrough"
              name="videoWalkthrough"
              value={formData.videoWalkthrough}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
            />
          </div>
        </div>

        <ImageInput
          label="Main Image URL"
          imageUrl={formData.mainImageUrl}
          onImageUrlChange={(url) => setFormData((prev) => ({ ...prev, mainImageUrl: url }))}
        />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Additional Images (Optional)</label>
          {formData.additionalImages.map((url, index) => (
            <ImageInput
              key={index}
              imageUrl={url}
              onImageUrlChange={(value) => handleImageChange('additionalImages', index, value)}
              onRemove={() => handleRemoveImage('additionalImages', index)}
              showRemove={formData.additionalImages.length > 1 || (formData.additionalImages.length === 1 && url !== '')}
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddImage('additionalImages')}
            className="flex items-center gap-2 text-[#E63946] hover:text-[#D62828] font-medium text-sm"
          >
            <PlusCircle size={20} />
            Add Image
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Render Images (Optional)</label>
          {formData.renderImages.map((url, index) => (
            <ImageInput
              key={index}
              imageUrl={url}
              onImageUrlChange={(value) => handleImageChange('renderImages', index, value)}
              onRemove={() => handleRemoveImage('renderImages', index)}
              showRemove={formData.renderImages.length > 1 || (formData.renderImages.length === 1 && url !== '')}
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddImage('renderImages')}
            className="flex items-center gap-2 text-[#E63946] hover:text-[#D62828] font-medium text-sm"
          >
            <PlusCircle size={20} />
            Add Image
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#E63946] hover:bg-[#D62828] text-white rounded-md transition-colors duration-200"
          >
            {isEditMode ? 'Save Project' : 'Add Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
