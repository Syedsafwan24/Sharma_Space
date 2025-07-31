'use client';
import React from 'react';

const PartnerBrands = ({ partnerBrands = [] }) => (
	<section className='bg-gray-100 py-10 sm:py-12 md:py-14'>
		<div className='max-w-6xl mx-auto px-6 text-center'>
			<h2 className='text-3xl md:text-4xl font-bold mb-4'>
				Our Partner Brands
			</h2>
			<p className='text-gray-600 mb-10 text-lg'>
				We collaborate with premium brands to ensure quality and excellence in
				every project.
			</p>
			<div className='flex flex-wrap justify-center gap-8'>
				{partnerBrands.map((b, i) => (
					<span
						key={b.name + i}
						className='inline-block text-lg md:text-xl font-semibold text-gray-400 tracking-wider uppercase px-4'
						style={{ letterSpacing: '0.09em' }}
					>
						{b.name}
					</span>
				))}
			</div>
		</div>
	</section>
);

export default PartnerBrands;
