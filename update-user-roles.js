const { PrismaClient } = require('./lib/generated/prisma');

const prisma = new PrismaClient();

async function updateUserRoles() {
	try {
		console.log('Checking current users...');

		const users = await prisma.user.findMany({
			orderBy: { id: 'asc' },
		});

		console.log(`Found ${users.length} users`);

		if (users.length === 0) {
			console.log(
				'No users found. The first user to register will become admin.'
			);
			return;
		}

		// Check if any user is already an admin
		const adminExists = users.some((user) => user.role === 'admin');

		if (adminExists) {
			console.log('Admin user already exists.');
			users.forEach((user) => {
				console.log(`- ${user.email}: ${user.role}`);
			});
			return;
		}

		// Make the first user an admin
		const firstUser = users[0];
		await prisma.user.update({
			where: { id: firstUser.id },
			data: { role: 'admin' },
		});

		console.log(`Updated ${firstUser.email} to admin role.`);

		// Show all users with their roles
		const updatedUsers = await prisma.user.findMany({
			orderBy: { id: 'asc' },
		});

		console.log('\nCurrent user roles:');
		updatedUsers.forEach((user) => {
			console.log(`- ${user.email}: ${user.role}`);
		});
	} catch (error) {
		console.error('Error updating user roles:', error);
	} finally {
		await prisma.$disconnect();
	}
}

updateUserRoles();
