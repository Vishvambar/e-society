'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="btn" style={{ width: '100%', justifyContent: 'flex-start', color: 'hsl(var(--destructive))' }}>
            Logout
        </button>
    );
}
