// components/DesignProcess.jsx
const DesignProcess = () => {
	const steps = [
		{
			number: '01',
			title: 'Initial Consultation',
			description:
				'We begin by understanding your vision, requirements, and budget through an in-depth consultation.',
		},
		{
			number: '02',
			title: 'Concept Development',
			description:
				'We create preliminary design concepts, including mood boards, color schemes, and material selections.',
		},
		{
			number: '03',
			title: 'Design Presentation',
			description:
				'We present detailed design plans, 3D visualizations, and material samples for your approval.',
		},
		{
			number: '04',
			title: 'Implementation',
			description:
				'We oversee the entire execution process, from contractor coordination to final styling.',
		},
	];

	return (
		<section className='py-16 bg-white'>
			<div className='max-w-4xl mx-auto px-6 sm:px-8'>
				{/* Main Title and Description */}
				<div className='text-center mb-16'>
					{' '}
					{/* Increased bottom margin */}
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						Our Design Process
					</h2>
					<p className='text-lg text-gray-600'>
						We follow a comprehensive approach to ensure your project is
						completed to your satisfaction.
					</p>
				</div>

				{/* Process Steps */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					{' '}
					{/* Increased gap */}
					{steps.map((step, index) => (
						<div
							key={index}
							className='flex p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white'
						>
							{/* Number Circle */}
							<div className='flex-shrink-0 mr-5'>
								{' '}
								{/* Increased right margin */}
								<div className='w-12 h-12 rounded-full bg-[#E63946] flex items-center justify-center'>
									<span className='text-white font-bold text-lg'>
										{step.number}
									</span>
								</div>
							</div>

							{/* Content */}
							<div>
								<h3 className='text-xl font-semibold text-gray-900 mb-3'>
									{' '}
									{/* Increased bottom margin */}
									{step.title}
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									{' '}
									{/* Added line height */}
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default DesignProcess;
