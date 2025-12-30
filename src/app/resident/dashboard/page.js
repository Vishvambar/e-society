import dbConnect from '@/lib/db';
import Bill from '@/models/Bill';
import Notice from '@/models/Notice';
import { getSession } from '@/lib/auth';
import { headers } from 'next/headers';
// Note: In Next.js 13+ App Router, cookies() is available. getSession uses cookies().

export const dynamic = 'force-dynamic';

export default async function ResidentDashboard() {
    await dbConnect();
    // We need to pass headers or cookies to getSession. 
    // getSession helper uses request.cookies. 
    // In Server Components, we use cookies().
    // Let's refactor getSession slightly or just use cookies() here and validat manually or pass a mock request object.
    // Actually, my getSession helper expects a Request object (NextRequest). In SC, we don't have that.
    // I'll grab cookies directly here.

    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Verify token manually (since getSession is designed for Routes/Middleware with Request)
    const { verifyJWT } = await import('@/lib/auth');
    const session = token ? await verifyJWT(token) : null;

    if (!session) return <div>Unauthorized</div>;

    // Fetch Pending Dues
    const pendingBills = await Bill.find({ resident: session.id, status: 'PENDING' });
    const totalDue = pendingBills.reduce((acc, bill) => acc + bill.amount, 0);

    // Recent Notices
    const recentNotices = await Notice.find({}).sort({ createdAt: -1 }).limit(3);

    return (
        <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Welcome back, {session.name}</h1>
            <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '2rem' }}>Flat No: {session.flatNo || 'N/A'}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ borderColor: totalDue > 0 ? 'hsl(var(--destructive))' : 'hsl(var(--border))' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem' }}>Total Pending Dues</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: totalDue > 0 ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))' }}>
                        ${totalDue}
                    </div>
                    {totalDue > 0 && <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'hsl(var(--destructive))' }}>Please pay immediately</p>}
                </div>
            </div>

            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Recent Notices</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {recentNotices.map(notice => (
                    <div key={notice._id} className="card">
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--accent))', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {notice.category}
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>{notice.title}</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))' }}>{notice.content.substring(0, 100)}...</p>
                    </div>
                ))}
                {recentNotices.length === 0 && <p className="text-muted-foreground">No recent notices.</p>}
            </div>
        </div>
    );
}
