import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    role: {
        type: String,
        enum: ['ADMIN', 'RESIDENT', 'SECURITY'],
        default: 'RESIDENT',
    },
    flatNo: {
        type: String,
        // Only relevant for Residents
        default: null,
    },
    contact: {
        type: String,
        default: null,
    },
    details: {
        type: Map,
        of: String,
        // Flexible container for extra info
        default: {},
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
