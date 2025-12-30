import Link from 'next/link';
import dbConnect from '@/lib/db';
import Complaint from '@/models/Complaint';
import { verifyJWT } from '@/lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ResidentComplaintsPage() {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const session = token ? await verifyJWT(token) : null;

    if (!session) return <div>Unauthorized</div>;

    const complaints = await Complaint.find({ resident: session.id }).sort({ createdAt: -1 });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Complaints</h1>
                <Link href="/resident/complaints/add" className="btn btn-primary">
                    + Lodge Complaint
                </Link>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {complaints.map(complaint => (
                    <div key={complaint._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '99px',
                                    backgroundColor: complaint.status === 'RESOLVED' ? 'hsl(var(--secondary))' : (complaint.status === 'IN_PROGRESS' ? '#fef08a' : '#fecaca'),
                                    color: complaint.status === 'RESOLVED' ? 'hsl(var(--secondary-foreground))' : (complaint.status === 'IN_PROGRESS' ? '#854d0e' : '#7f1d1d'),
                                    display: 'inline-block',
                                    marginBottom: '0.5rem'
                                }}>
                                    {complaint.status}
                                </span>
                                <h3 style={{ marginBottom: '0.5rem' }}>{complaint.title}</h3>
                                <p style={{ color: 'hsl(var(--muted-foreground))', whiteSpace: 'pre-wrap' }}>
                                    {complaint.description}
                                </p>
                            </div>
                        </div>
                        {complaint.feedback && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'hsl(var(--muted))', borderRadius: 'var(--radius)', fontSize: '0.875rem' }}>
                                <strong>Admin Response:</strong> {complaint.feedback}
                            </div>
                        )}
                    </div>
                ))}
                {complaints.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--muted-foreground))' }}>You haven't raised any complaints.</div>
                )}
            </div>
        </div>
    );
}
