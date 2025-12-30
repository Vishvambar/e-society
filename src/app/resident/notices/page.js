import dbConnect from '@/lib/db';
import Notice from '@/models/Notice';

export const dynamic = 'force-dynamic';

export default async function ResidentNoticesPage() {
    await dbConnect();
    const notices = await Notice.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Notices & Events</h1>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {notices.map(notice => (
                    <div key={notice._id} className="card">
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--accent))', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {notice.category}
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{notice.title}</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            {notice.content}
                        </p>
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                            Posted on {new Date(notice.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
                {notices.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--muted-foreground))' }}>No notices yet.</div>
                )}
            </div>
        </div>
    );
}
