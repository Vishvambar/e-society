import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, default: 'General' }, // 'Event', 'Maintenance', 'General'
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
