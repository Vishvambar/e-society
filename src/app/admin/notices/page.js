import Link from 'next/link';
import dbConnect from '@/lib/db';
import Notice from '@/models/Notice';
import DeleteNoticeButton from './DeleteNoticeButton';

export const dynamic = 'force-dynamic';

export default async function NoticesPage() {
    await dbConnect();
    const notices = await Notice.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Notice Board</h1>
                <Link href="/admin/notices/add" className="btn btn-primary">
                    + Create Notice
                </Link>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {notices.map(notice => (
                    <div key={notice._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
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
                            <div style={{ marginLeft: '1rem' }}>
                                <DeleteNoticeButton id={notice._id.toString()} />
                            </div>
                        </div>
                    </div>
                ))}
                {notices.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--muted-foreground))' }}>No notices posted yet.</div>
                )}
            </div>
        </div>
    );
}
