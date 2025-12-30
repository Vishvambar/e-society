import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>403</h1>
            <h2 style={{ marginBottom: '2rem' }}>Access Denied</h2>
            <p style={{ marginBottom: '2rem', color: 'hsl(var(--muted-foreground))' }}>
                You do not have permission to view this page.
            </p>
            <Link href="/login" className="btn btn-primary">
                Return to Login
            </Link>
        </div>
    );
}
