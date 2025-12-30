const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load env vars if running locally with dotenv, or manually pass them
// Usage: MONGODB_URI=... node scripts/seed-admin.js

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define MONGODB_URI');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    flatNo: String,
    contact: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = await User.findOneAndUpdate(
            { email: 'admin@society.com' },
            {
                name: 'Super Admin',
                email: 'admin@society.com',
                password: hashedPassword,
                role: 'ADMIN'
            },
            { upsert: true, new: true }
        );

        console.log('Admin User Seeded/Updated:');
        console.log('Email: admin@society.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
