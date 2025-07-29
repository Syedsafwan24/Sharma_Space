import { Resend } from 'resend';

// Initialize Resend with proper error handling for build time
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req) {
	try {
		const { to, subject, text, originalMessage } = await req.json();

		if (!to || !subject || !text) {
			return new Response(
				JSON.stringify({ error: 'Missing required fields.' }),
				{ status: 400 }
			);
		}

		// Check if Resend is properly configured
		if (!resend || !process.env.RESEND_API_KEY) {
			console.warn('RESEND_API_KEY not configured. Email functionality disabled.');
			return new Response(
				JSON.stringify({ 
					message: 'Email service not configured. Please set RESEND_API_KEY environment variable.',
					success: false,
					emailSent: false
				}),
				{ status: 500 }
			);
		}

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: 'Sharma Space <info@sharmaspace.in>',
			to: [to],
			subject: subject,
			text: `${text}\n\n---\nOriginal Message:\n${originalMessage || ''}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px;">
					<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
						<h2 style="color: #E63946; margin-bottom: 20px;">Reply from Sharma Space</h2>
						<div style="background-color: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
							${text.replace(/\n/g, '<br>')}
						</div>
						${
							originalMessage
								? `
							<div style="border-top: 1px solid #dee2e6; padding-top: 15px;">
								<h4 style="color: #6c757d; margin-bottom: 10px;">Original Message:</h4>
								<p style="color: #6c757d; font-style: italic;">${originalMessage.replace(/\n/g, '<br>')}</p>
							</div>
						`
								: ''
						}
					</div>
				</div>
			`,
		});

		if (error) {
			console.error('Resend error:', error);
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
			});
		}

		return new Response(JSON.stringify({ success: true, messageId: data.id }), {
			status: 200,
		});
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
