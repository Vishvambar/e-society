import dbConnect from '@/lib/db';
import Visitor from '@/models/Visitor';
import CheckOutButton from './CheckOutButton';

export const dynamic = 'force-dynamic';

export default async function ActiveVisitorsPage() {
    await dbConnect();
    const activeVisitors = await Visitor.find({ outTime: { $exists: false } }).sort({ inTime: -1 });

    return (
        <div>
            <div className="page-header">
                <h1>Active Visitors</h1>
                <div className="btn btn-outline" style={{ cursor: 'default' }}>
                    Total: {activeVisitors.length}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {activeVisitors.map(v => (
                    <div key={v._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{v.name}</h3>
                            <span className="font-mono" style={{ fontSize: '0.875rem', backgroundColor: 'hsl(var(--secondary))', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                {v.flatNo}
                            </span>
                        </div>
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>{v.mobile}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--primary))' }}>
                                {v.purpose.toUpperCase()}
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                {new Date(v.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid hsl(var(--border))' }}>
                            <CheckOutButton id={v._id.toString()} />
                        </div>
                    </div>
                ))}
                {activeVisitors.length === 0 && (
                    <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'hsl(var(--muted-foreground))' }}>
                        <h3>No active visitors</h3>
                        <p>All visitors have checked out.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
