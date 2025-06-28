'use client';
import React from 'react';
import Image from 'next/image';
import { teamMembers } from '@/app/data';

const TeamSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member, idx) => (
            <div key={member.id} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
              <div className="w-64 h-64 mb-6 rounded-lg overflow-hidden">
                <Image 
                  src={member.image?.url || member.image} 
                  alt={member.name} 
                  width={256} 
                  height={256} 
                  className="object-cover w-full h-full" 
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{member.name}</h3>
              <div className="text-red-600 font-medium mb-2 text-center">{member.title}</div>
              <p className="text-gray-700 text-base text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;