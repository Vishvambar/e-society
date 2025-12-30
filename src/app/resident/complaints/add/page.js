'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LodgeComplaintPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/resident/complaints');
                router.refresh();
            } else {
                alert('Failed');
            }
        } catch (err) {
            alert('Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Lodge a Complaint</h1>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Subject</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Street light not working"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
                        <textarea
                            required
                            placeholder="Describe the issue in detail..."
                            rows={5}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))', fontFamily: 'inherit' }}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => router.back()} className="btn" style={{ background: 'transparent', border: '1px solid hsl(var(--input))' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit Complaint'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
