import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

const ProjectHeader = ({ onAddProjectClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1C1C1C]">Projects</h1>
        <p className="text-gray-600">Manage portfolio projects and case studies</p>
      </div>
      <button
        onClick={onAddProjectClick}
        className="bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200 hidden lg:flex"
      >
        <PlusCircle size={20} />
        Add New Project
      </button>
    </div>
  );
};

export default ProjectHeader;
