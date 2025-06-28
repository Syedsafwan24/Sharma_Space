'use client';

import React from 'react';
import { X } from 'lucide-react';

const EditTestimonialModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#E63946] transition-colors duration-200"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default EditTestimonialModal;
