import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function SecurityLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <header style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Gatekeeper</h2>
                <nav style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href="/security/entry" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Visitor Entry</Link>
                    <Link href="/security/active" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Check-Out</Link>
                    <Link href="/security/emergency" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Emergency</Link>
                </nav>
                <div style={{ width: '100px' }}>
                    {/* Simple logout link or reuse button with overrides */}
                    <LogoutButton />
                </div>
            </header>

            <main className="container" style={{ padding: '2rem 1rem' }}>
                {children}
            </main>
        </div>
    );
}
