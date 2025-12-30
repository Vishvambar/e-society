'use client';
import { useRouter } from 'next/navigation';

export default function DeleteNoticeButton({ id }) {
    const router = useRouter();
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this notice?')) return;

        try {
            await fetch(`/api/notices/${id}`, { method: 'DELETE' });
            router.refresh();
        } catch (e) {
            alert('Failed to delete');
        }
    };
    return (
        <button onClick={handleDelete} className="btn" style={{
            color: 'hsl(var(--destructive))',
            background: 'hsl(var(--secondary))',
            border: 'none',
            fontSize: '0.875rem',
            padding: '0.25rem 0.75rem'
        }}>
            Delete
        </button>
    )
}
