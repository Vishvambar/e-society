import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }) {
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
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Society Admin</h2>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Management Portal</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <SidebarLink href="/admin/dashboard" label="Dashboard" />
                    <SidebarLink href="/admin/members" label="Members" />
                    <SidebarLink href="/admin/notices" label="Notices" />
                    <SidebarLink href="/admin/complaints" label="Complaints" />
                    <SidebarLink href="/admin/billing" label="Billing" />
                    <SidebarLink href="/admin/visitors" label="Visitor Logs" />
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
