import Link from 'next/link';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
    await dbConnect();
    // Using verifyJWT to ensure protection? No, middleware protects this page.
    const members = await User.find({ role: 'RESIDENT' }).sort({ flatNo: 1 });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Resident Members</h1>
                <Link href="/admin/members/add" className="btn btn-primary">
                    + Add Member
                </Link>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead style={{ background: 'hsl(var(--muted))', borderBottom: '1px solid hsl(var(--border))' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Flat No</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Contact</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Email</th>
                                {/* <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member._id} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                                    <td style={{ padding: '1rem' }}>{member.flatNo || '-'}</td>
                                    <td style={{ padding: '1rem' }}>{member.name}</td>
                                    <td style={{ padding: '1rem' }}>{member.contact || '-'}</td>
                                    <td style={{ padding: '1rem' }}>{member.email}</td>
                                    {/* <td style={{ padding: '1rem' }}>
                    <button className="btn" style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}>Edit</button>
                    </td> */}
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>No members found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
