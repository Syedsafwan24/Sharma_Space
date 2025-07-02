import React from 'react';
import Link from 'next/link';
import {
	Package,
	Settings,
	MessageSquare,
	Mail,
	Edit,
	Edit2,
} from 'lucide-react';

const iconMap = {
	Package: Package,
	Settings: Settings,
	MessageSquare: MessageSquare,
	Mail: Mail,
	Edit: Edit,
	Edit2: Edit2,
};

function StatsCard({ title, value, icon, color, href }) {
	const IconComponent = iconMap[icon];
	const iconBg = color || '#E63946';

	return (
		<Link
			href={href || '#'}
			className='block focus:outline-none focus:ring-2 focus:ring-[#E63946]'
			tabIndex={0}
			aria-label={`Edit ${title}`}
		>
			<div className='bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-44 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 cursor-pointer items-center text-center relative group'>
				{/* Edit Icon - Top Right Corner */}
				<div className='absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200'>
					<Edit2
						size={16}
						className='text-gray-400 group-hover:text-gray-600 transition-colors duration-200'
						aria-label='Edit'
					/>
				</div>

				<div className='flex justify-center items-center w-full mb-2'>
					<div
						className='w-10 h-10 rounded-full flex items-center justify-center'
						style={{ background: iconBg + '22' }}
					>
						{IconComponent && (
							<IconComponent size={22} style={{ color: iconBg }} />
						)}
					</div>
				</div>
				<div className='w-full mb-2 min-h-[40px] flex items-center justify-center'>
					<h3 className='text-lg font-semibold text-gray-700 leading-tight text-center w-full'>
						{title}
					</h3>
				</div>
				<div className='flex flex-col items-center justify-center flex-1 w-full mt-2'>
					<span className='text-4xl font-bold text-[#1C1C1C]'>{value}</span>
				</div>
			</div>
		</Link>
	);
}

export default StatsCard;
