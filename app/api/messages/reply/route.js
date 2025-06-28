import nodemailer from 'nodemailer';

export async function POST(req) {
	try {
		const { to, subject, text, originalMessage } = await req.json();

		if (!to || !subject || !text) {
			return new Response(
				JSON.stringify({ error: 'Missing required fields.' }),
				{ status: 400 }
			);
		}

		// Create transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.GMAIL_USER,
			to,
			subject,
			text: `${text}\n\n---\nOriginal Message:\n${originalMessage || ''}`,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
