// Test script to verify blog update performance improvements
// Run this in the browser console on the admin blog posts page

console.log('Testing blog update performance improvements...');

// Test cache-busting fetch
async function testCacheBusting() {
	console.time('Cache-busting fetch');
	const response = await fetch('/api/blog-posts', {
		headers: {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
			'X-Requested-With': 'XMLHttpRequest',
		},
	});
	const data = await response.json();
	console.timeEnd('Cache-busting fetch');
	console.log('Fetched', data.length, 'blog posts');
}

// Test regular fetch for comparison
async function testRegularFetch() {
	console.time('Regular fetch');
	const response = await fetch('/api/blog-posts');
	const data = await response.json();
	console.timeEnd('Regular fetch');
	console.log('Fetched', data.length, 'blog posts');
}

// Run tests
testCacheBusting();
setTimeout(testRegularFetch, 1000);

console.log(
	'Performance test completed. Check the console for timing results.'
);
