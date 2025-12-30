import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'], default: 'OPEN' },
    feedback: { type: String }, // Admin response
}, { timestamps: true });

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
