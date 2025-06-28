'use client';

import React from 'react';
import { Plus } from 'lucide-react';

const TestimonialHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-[#1C1C1C]">Testimonials</h1>
      <button
        className="px-4 py-2 bg-[#E63946] hover:bg-[#D62828] text-white rounded-md flex items-center gap-2 transition-colors duration-200"
      >
        <Plus size={20} />
        Add New Testimonial
      </button>
    </div>
  );
};

export default TestimonialHeader;
