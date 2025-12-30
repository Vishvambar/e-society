'use client';
import { useRouter } from 'next/navigation';

export default function UpdateComplaintStatus({ id, currentStatus }) {
    const router = useRouter();

    const handleUpdate = async (newStatus) => {
        try {
            await fetch(`/api/complaints/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            router.refresh();
        } catch (e) {
            alert('Failed to update');
        }
    };

    if (currentStatus === 'RESOLVED') return null;

    return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            {currentStatus === 'OPEN' && (
                <button onClick={() => handleUpdate('IN_PROGRESS')} className="btn" style={{ fontSize: '0.75rem', background: '#fef08a', color: '#854d0e', border: 'none' }}>
                    Mark In Progress
                </button>
            )}
            <button onClick={() => handleUpdate('RESOLVED')} className="btn" style={{ fontSize: '0.75rem', background: 'hsl(var(--primary))', color: 'white', border: 'none' }}>
                Resolve
            </button>
        </div>
    )
}
