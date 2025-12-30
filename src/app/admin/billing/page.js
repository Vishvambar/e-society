import Link from 'next/link';
import dbConnect from '@/lib/db';
import Bill from '@/models/Bill';

export const dynamic = 'force-dynamic';

export default async function BillingPage() {
    await dbConnect();
    const bills = await Bill.find({})
        .populate('resident', 'name flatNo')
        .sort({ createdAt: -1 })
        .limit(50); // Show last 50

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Billing & Accounts</h1>
                <Link href="/admin/billing/generate" className="btn btn-primary">
                    Generate Monthly Bills
                </Link>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead style={{ background: 'hsl(var(--muted))', borderBottom: '1px solid hsl(var(--border))' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Flat No</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Resident</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Period</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Amount</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(bill => (
                                <tr key={bill._id} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                                    <td style={{ padding: '1rem' }}>{bill.resident?.flatNo || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>{bill.resident?.name || 'Unknown'}</td>
                                    <td style={{ padding: '1rem' }}>{bill.month} {bill.year}</td>
                                    <td style={{ padding: '1rem' }} className="font-mono">${bill.amount}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '99px',
                                            backgroundColor: bill.status === 'PAID' ? 'hsl(var(--secondary))' : '#fecaca',
                                            color: bill.status === 'PAID' ? 'hsl(var(--secondary-foreground))' : '#7f1d1d',
                                        }}>
                                            {bill.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {bills.length === 0 && (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>No bills generated yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
