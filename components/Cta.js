// components/HeroBanner.jsx
import Link from 'next/link';

const Cta = ({
	title = 'Ready to Transform Your Space?',
	description = "Let's collaborate to create a space that perfectly balances aesthetics and functionality.",
	buttonText = 'Get a Free Consultation',
	backgroundColor = 'bg-[#E63946]',
	textColor = 'text-white',
	buttonBgColor = 'bg-white',
	buttonTextColor = 'text-[#E63946]',
	buttonLink = '/contact',
	maxWidth = 'max-w-2xl',
}) => {
	return (
		<section className={`${backgroundColor} py-12 sm:py-16`}>
			<div className={`container ${maxWidth} px-4 mx-auto text-center`}>
				<h1 className={`${textColor} text-3xl sm:text-4xl font-extrabold mb-4`}>
					{title}
				</h1>

				<p
					className={`${textColor} text-sm sm:text-base mb-6 lg:whitespace-nowrap max-w-prose mx-auto`}
				>
					{description}
				</p>

				<Link
					href={buttonLink}
					aria-label={buttonText}
					className={`
						${buttonBgColor} ${buttonTextColor}
						inline-block px-6 py-2 rounded-full font-semibold
						text-sm sm:text-base transition duration-200 ease-in-out
						hover:shadow-md hover:bg-opacity-90
						focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
					`}
				>
					{buttonText}
				</Link>
			</div>
		</section>
	);
};

export default Cta;
