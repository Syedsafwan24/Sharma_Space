import React from 'react';
import Link from 'next/link';
import { Package, Settings, MessageSquare, Mail, Edit } from 'lucide-react';

const iconMap = {
	Package: Package,
	Settings: Settings,
	MessageSquare: MessageSquare,
	Mail: Mail,
	Edit: Edit,
};

function StatsCard({ title, value, icon, color, href }) {
	const IconComponent = iconMap[icon];
	const iconBg = color || '#E63946';

	return (
		<Link
			href={href || '#'}
			className='block focus:outline-none focus:ring-2 focus:ring-[#E63946]'
			tabIndex={0}
			aria-label={`Go to ${title}`}
		>
			<div className='bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-44 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-50 cursor-pointer items-center text-center relative'>
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
					<span className='text-4xl font-bold text-[#1C1C1C] mb-2'>
						{value}
					</span>
					<span className='text-sm text-[#E63946] font-medium whitespace-nowrap flex items-center gap-1'>
						Click to manage <span aria-hidden>→</span>
					</span>
				</div>
			</div>
		</Link>
	);
}

export default StatsCard;
