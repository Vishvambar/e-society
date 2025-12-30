import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function ResidentLayout({ children }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                background: 'hsl(var(--card))',
                borderRight: '1px solid hsl(var(--border))',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                left: 0,
                top: 0
            }}>
                <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>My Home</h2>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Resident Portal</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <SidebarLink href="/resident/dashboard" label="Dashboard" />
                    <SidebarLink href="/resident/notices" label="Notices & Events" />
                    <SidebarLink href="/resident/complaints" label="My Complaints" />
                    <SidebarLink href="/resident/payments" label="Bills & Payments" />
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid hsl(var(--border))', paddingTop: '1rem' }}>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ href, label }) {
    return (
        <Link href={href} style={{
            display: 'block',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius)',
            color: 'hsl(var(--foreground))',
            transition: 'background-color 0.2s',
            fontWeight: 500
        }} className="hover:bg-slate-100">
            {label}
        </Link>
    );
}
