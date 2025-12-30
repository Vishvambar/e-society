'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateBillPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear(),
        amount: 5000,
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/billing/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push('/admin/billing');
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
            <h1 style={{ marginBottom: '2rem' }}>Generate Monthly Bills</h1>

            <div className="card">
                <p style={{ marginBottom: '1.5rem', color: 'hsl(var(--muted-foreground))' }}>
                    This will generate a maintenance bill for ALL active residents.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Month</label>
                            <select
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                                value={formData.month}
                                onChange={e => setFormData({ ...formData, month: e.target.value })}
                            >
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Year</label>
                            <input
                                type="number"
                                required
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                                value={formData.year}
                                onChange={e => setFormData({ ...formData, year: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Amount</label>
                        <input
                            type="number"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Due Date</label>
                        <input
                            type="date"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.dueDate}
                            onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => router.back()} className="btn" style={{ background: 'transparent', border: '1px solid hsl(var(--input))' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Generating...' : 'Generate and Send'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
