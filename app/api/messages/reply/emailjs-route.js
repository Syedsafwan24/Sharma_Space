// Alternative implementation using EmailJS (no domain verification needed)
import emailjs from '@emailjs/browser';

export async function POST(req) {
	try {
		const { to, subject, text, originalMessage } = await req.json();

		if (!to || !subject || !text) {
			return new Response(
				JSON.stringify({ error: 'Missing required fields.' }),
				{ status: 400 }
			);
		}

		// EmailJS template parameters
		const templateParams = {
			to_email: to,
			from_name: 'Sharma Space',
			from_email: 'info@sharmaspace.in',
			subject: subject,
			message: text,
			original_message: originalMessage || '',
			reply_to: 'info@sharmaspace.in',
		};

		// Send email using EmailJS
		const result = await emailjs.send(
			process.env.EMAILJS_SERVICE_ID,
			process.env.EMAILJS_TEMPLATE_ID,
			templateParams,
			process.env.EMAILJS_PUBLIC_KEY
		);

		return new Response(
			JSON.stringify({
				success: true,
				messageId: result.text,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
