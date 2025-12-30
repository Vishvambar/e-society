import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import User from '@/models/User'; // Populate resident
import UpdateComplaintStatus from './UpdateComplaintStatus'; // Client Component

export const dynamic = 'force-dynamic';

export default async function ComplaintsPage() {
    await dbConnect();
    const complaints = await Complaint.find({})
        .populate('resident', 'name flatNo')
        .sort({ createdAt: -1 });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Complaints Box</h1>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {complaints.map(complaint => (
                    <div key={complaint._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '99px',
                                        backgroundColor: complaint.status === 'RESOLVED' ? 'hsl(var(--secondary))' : (complaint.status === 'IN_PROGRESS' ? '#fef08a' : '#fecaca'),
                                        color: complaint.status === 'RESOLVED' ? 'hsl(var(--secondary-foreground))' : (complaint.status === 'IN_PROGRESS' ? '#854d0e' : '#7f1d1d'),
                                    }}>
                                        {complaint.status}
                                    </span>
                                    <span style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                                        {complaint.resident?.flatNo} - {complaint.resident?.name}
                                    </span>
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{complaint.title}</h3>
                                <p style={{ color: 'hsl(var(--muted-foreground))', whiteSpace: 'pre-wrap' }}>
                                    {complaint.description}
                                </p>
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <UpdateComplaintStatus id={complaint._id.toString()} currentStatus={complaint.status} />
                            </div>
                        </div>
                    </div>
                ))}
                {complaints.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--muted-foreground))' }}>No complaints found.</div>
                )}
            </div>
        </div>
    );
}
