'use client';

import React from 'react';
import { X } from 'lucide-react';

const EditBlogModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1C1C1C]/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F8F9FA] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-0">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#E63946] transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default EditBlogModal;
