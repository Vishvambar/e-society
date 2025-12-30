'use client';
import { useRouter } from 'next/navigation';

export default function CheckOutButton({ id }) {
    const router = useRouter();
    const handleCheckOut = async () => {
        if (!confirm('Mark this visitor as OUT?')) return;
        await fetch(`/api/visitors/${id}/out`, { method: 'POST' });
        router.refresh();
    };
    return (
        <button onClick={handleCheckOut} className="btn" style={{ background: 'hsl(var(--destructive))', color: 'white', border: 'none' }}>
            Check Out
        </button>
    )
}
