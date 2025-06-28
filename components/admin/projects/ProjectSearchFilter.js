import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ProjectSearchFilter = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) => {
  const filters = ['All', 'Residential', 'Commercial', 'Hospitality'];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]"
        />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex space-x-2 bg-gray-200 p-1 rounded-md">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-white text-[#E63946] shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectSearchFilter;
