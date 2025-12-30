import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    dueDate: { type: Date },
}, { timestamps: true });

export default mongoose.models.Bill || mongoose.model('Bill', BillSchema);
