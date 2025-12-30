import dbConnect from '@/lib/db';
import Visitor from '@/models/Visitor';

export const dynamic = 'force-dynamic';

export default async function VisitorsPage() {
    await dbConnect();
    const visitors = await Visitor.find({}).sort({ inTime: -1 });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Visitor Logs</h1>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'hsl(var(--muted))', borderBottom: '1px solid hsl(var(--border))' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Visitor Name</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Mobile</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Flat No</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Purpose</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>In Time</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(v => (
                            <tr key={v._id} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                                <td style={{ padding: '1rem' }}>{v.name}</td>
                                <td style={{ padding: '1rem' }} className="font-mono">{v.mobile}</td>
                                <td style={{ padding: '1rem' }}>{v.flatNo}</td>
                                <td style={{ padding: '1rem' }}>{v.purpose}</td>
                                <td style={{ padding: '1rem' }}>{new Date(v.inTime).toLocaleString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    {v.outTime ? new Date(v.outTime).toLocaleString() : <span style={{ color: 'hsl(var(--accent))', fontWeight: 600 }}>Active</span>}
                                </td>
                            </tr>
                        ))}
                        {visitors.length === 0 && (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>No visitor logs found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
