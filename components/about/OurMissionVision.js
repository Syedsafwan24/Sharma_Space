import React from 'react';
import { companyInfo } from '@/app/data';

const OurMissionVision = () => (
  <section className="bg-[#F5F6F8] py-20 w-full">
    <div className="max-w-4xl mx-auto px-4 text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Mission & Vision</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white rounded-lg shadow p-8 text-left">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Mission</h3>
          <p className="text-gray-700 text-base leading-relaxed">
            {companyInfo?.mission || 'To create functional, beautiful spaces that enhance the lives of our clients while maintaining the highest standards of design excellence and professional integrity.'}
          </p>
        </div>
        {/* Vision */}
        <div className="bg-white rounded-lg shadow p-8 text-left">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Vision</h3>
          <p className="text-gray-700 text-base leading-relaxed">
            {companyInfo?.vision || 'To be the leading interior design firm known for innovative, sustainable, and client-centered design solutions that transform spaces into extraordinary environments.'}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default OurMissionVision;