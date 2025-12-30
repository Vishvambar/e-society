import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    purpose: { type: String, required: true }, // e.g., 'Delivery', 'Guest', 'Maintenance'
    flatNo: { type: String, required: true },
    inTime: { type: Date, default: Date.now },
    outTime: { type: Date },
    gatekeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who let them in
}, { timestamps: true });

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
