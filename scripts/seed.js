const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://vishvambarudavant96:YkNfIvvHrqXc67Mn@cluster0.hppib6y.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'RESIDENT', 'SECURITY'], default: 'RESIDENT' },
    flatNo: { type: String, default: null },
    contact: { type: String, default: null },
    details: { type: Map, of: String, default: {} },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing users? Let's not destroy data blindly, but for a seed request usually it implies a fresh start or ensuring these users exist.
        // I will check if they exist, if not create them.

        const passwordHash = await bcrypt.hash('password123', 10);

        const users = [
            {
                name: 'Society Admin',
                email: 'admin@society.com',
                password: passwordHash,
                role: 'ADMIN',
                contact: '9999999999'
            },
            {
                name: 'John Doe',
                email: 'resident@society.com',
                password: passwordHash,
                role: 'RESIDENT',
                flatNo: 'A-101',
                contact: '8888888888'
            },
            {
                name: 'Gate Keeper',
                email: 'security@society.com',
                password: passwordHash,
                role: 'SECURITY',
                contact: '7777777777'
            }
        ];

        for (const u of users) {
            const exists = await User.findOne({ email: u.email });
            if (!exists) {
                await User.create(u);
                console.log(`Created user: ${u.email}`);
            } else {
                console.log(`User already exists: ${u.email}`);
            }
        }

        console.log('Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
