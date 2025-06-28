'use client';

import React, { useState } from 'react';
import {
  Sofa,
  Bed,
  Armchair,
  Home,
  Building,
  Palette,
  Lightbulb,
  Ruler,
  PenTool,
  Building2,
  Hammer,
  Paintbrush,
  Hotel,
  LayoutGrid
} from 'lucide-react';

const iconOptions = [
  { value: 'Sofa', label: 'Couch', icon: Sofa },
  { value: 'Bed', label: 'Bed', icon: Bed },
  { value: 'Armchair', label: 'Chair', icon: Armchair },
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'Building', label: 'Building', icon: Building },
  { value: 'Palette', label: 'Design/Palette', icon: Palette },
  { value: 'Lightbulb', label: 'Idea', icon: Lightbulb },
  { value: 'Ruler', label: 'Measurements', icon: Ruler },
  { value: 'PenTool', label: 'Design Tool', icon: PenTool },
  { value: 'Building2', label: 'Architecture', icon: Building2 },
  { value: 'Hammer', label: 'Construction', icon: Hammer },
  { value: 'Paintbrush', label: 'Painting', icon: Paintbrush },
];

const EditServiceForm = ({ service, onClose }) => {
  const isEditMode = !!service;
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    icon: service?.icon || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditMode ? 'Form submitted for edit:' : 'Form submitted for add:', formData);
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">{isEditMode ? 'Edit Service' : 'Add Service'}</h2>
      <p className="text-gray-600 mb-6">{isEditMode ? 'Update the details for this service.' : 'Fill in the details for the new service.'}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Service Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
          />
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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Icon</label>
          <div className="grid grid-cols-3 gap-2">
            {iconOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, icon: option.value }))}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors duration-200 ${
                    formData.icon === option.value
                      ? 'bg-[#E63946] text-white shadow-sm'
                      : 'bg-[#EDEDED] text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent size={24} />
                  <span className="text-xs mt-1">{option.label}</span>
                </button>
              );
            })}
          </div>
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
            {isEditMode ? 'Save Service' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditServiceForm;
