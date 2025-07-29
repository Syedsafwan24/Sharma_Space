'use client';

import { motion } from 'framer-motion';

export default function AnimationTest() {
	return (
		<div className='fixed bottom-4 right-4 z-50'>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1 }}
				className='bg-red-500 text-white p-3 rounded-lg shadow-lg'
			>
				Animation Test
			</motion.div>
		</div>
	);
}
