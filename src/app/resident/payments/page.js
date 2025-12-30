import dbConnect from '@/lib/db';
import Bill from '@/models/Bill';
import { verifyJWT } from '@/lib/auth';
import { cookies } from 'next/headers';
import PayButton from './PayButton';

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const session = token ? await verifyJWT(token) : null;

    if (!session) return <div>Unauthorized</div>;

    const bills = await Bill.find({ resident: session.id }).sort({ createdAt: -1 });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Bills & Payments</h1>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead style={{ background: 'hsl(var(--muted))', borderBottom: '1px solid hsl(var(--border))' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Period</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Amount</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Due Date</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(bill => (
                                <tr key={bill._id} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                                    <td style={{ padding: '1rem' }}>{bill.month} {bill.year}</td>
                                    <td style={{ padding: '1rem' }} className="font-mono">${bill.amount}</td>
                                    <td style={{ padding: '1rem' }}>{bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : '-'}</td>
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
                                    <td style={{ padding: '1rem' }}>
                                        {bill.status === 'PENDING' && <PayButton id={bill._id.toString()} amount={bill.amount} />}
                                        {bill.status === 'PAID' && <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>Paid</span>}
                                    </td>
                                </tr>
                            ))}
                            {bills.length === 0 && (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>No bills found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
