import dbConnect from '@/lib/db';
import Visitor from '@/models/Visitor';
import CheckOutButton from './CheckOutButton';

export const dynamic = 'force-dynamic';

export default async function ActiveVisitorsPage() {
    await dbConnect();
    // Find visitors who have NO outTime
    const activeVisitors = await Visitor.find({ outTime: { $exists: false } }).sort({ inTime: -1 });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Active Visitors (Check-Out)</h1>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {activeVisitors.map(v => (
                    <div key={v._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>{v.name}</h3>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>{v.mobile} • Flat {v.flatNo}</p>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 600, color: 'hsl(var(--accent))' }}>
                                {v.purpose} • In: {new Date(v.inTime).toLocaleTimeString()}
                            </div>
                        </div>
                        <CheckOutButton id={v._id.toString()} />
                    </div>
                ))}
                {activeVisitors.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--muted-foreground))' }}>No active visitors.</div>
                )}
            </div>
        </div>
    );
}
