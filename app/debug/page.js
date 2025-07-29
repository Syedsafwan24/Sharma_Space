export default function DebugPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Information</h1>
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">Environment Information</h2>
					<div className="space-y-2 text-sm">
						<p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
						<p><strong>Next.js Version:</strong> 14.2.30</p>
						<p><strong>Build Time:</strong> {new Date().toISOString()}</p>
					</div>
				</div>
			</div>
		</div>
	);
}