'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PayButton({ id, amount }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        if (!confirm(`Confirm payment of $${amount}?`)) return;
        setLoading(true);
        try {
            await fetch(`/api/billing/${id}/pay`, { method: 'POST' });
            router.refresh();
        } catch (e) {
            alert('Payment failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <button onClick={handlePay} disabled={loading} className="btn" style={{
            color: 'white',
            background: 'hsl(var(--accent))',
            border: 'none',
            fontSize: '0.875rem',
            padding: '0.25rem 0.75rem'
        }}>
            {loading ? 'Processing...' : 'Pay Now'}
        </button>
    )
}
