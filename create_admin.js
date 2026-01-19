/**
 * Script to create a default admin user for the application.
 * Usage: node create_admin.js
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    try {
        const user = await prisma.user.upsert({
            where: { email: 'admin@hopeconnect.org' },
            update: { role: 'ADMIN' }, // Ensure they are admin if they exist
            create: {
                email: 'admin@hopeconnect.org',
                name: 'Admin User',
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        console.log('Admin user ready.');
        console.log('Email: admin@hopeconnect.org');
        console.log('Password: admin123');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
