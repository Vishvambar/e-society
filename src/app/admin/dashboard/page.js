import dbConnect from '@/lib/db';
import User from '@/models/User';
import Complaint from '@/models/Complaint';
import Notice from '@/models/Notice';
import Visitor from '@/models/Visitor';

// Force dynamic rendering to ensure stats are up to date
export const dynamic = 'force-dynamic';

async function getStats() {
    await dbConnect();

    const totalResidents = await User.countDocuments({ role: 'RESIDENT' });
    const openComplaints = await Complaint.countDocuments({ status: 'OPEN' });
    const activeNotices = await Notice.countDocuments({});

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const visitorsToday = await Visitor.countDocuments({ inTime: { $gte: startOfDay } });

    return { totalResidents, openComplaints, activeNotices, visitorsToday };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard Overview</h1>
                <div className="text-sm text-muted">
                    Welcome back, Admin
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <StatCard title="Total Residents" value={stats.totalResidents} />
                <StatCard title="Open Complaints" value={stats.openComplaints} alert={stats.openComplaints > 0} />
                <StatCard title="Active Notices" value={stats.activeNotices} />
                <StatCard title="Visitors Today" value={stats.visitorsToday} />
            </div>
        </div>
    );
}

function StatCard({ title, value, alert }) {
    return (
        <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderColor: alert ? 'hsl(var(--destructive))' : 'hsl(var(--border))'
        }}>
            <h3 style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem', fontWeight: 600 }}>{title}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: alert ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))' }}>{value}</div>
        </div>
    );
}
