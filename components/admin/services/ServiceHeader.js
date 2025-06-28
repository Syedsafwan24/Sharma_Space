import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

const ServiceHeader = ({ onAddServiceClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1C1C1C]">Services</h1>
        <p className="text-gray-600">Manage your service offerings</p>
      </div>
      <button
        onClick={onAddServiceClick}
        className="bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200 hidden lg:flex"
      >
        <PlusCircle size={20} />
        Add New Service
      </button>
    </div>
  );
};

export default ServiceHeader;
