'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNoticePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetch('/api/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            router.push('/admin/notices');
            router.refresh();
        } catch (err) {
            alert('Failed to create notice');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Create Notice</h1>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Title</label>
                        <input
                            type="text"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Category</label>
                        <select
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="General">General</option>
                            <option value="Event">Event</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Content</label>
                        <textarea
                            required
                            rows={5}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))', fontFamily: 'inherit' }}
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => router.back()} className="btn" style={{ background: 'transparent', border: '1px solid hsl(var(--input))' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Posting...' : 'Post Notice'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
