'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VisitorEntryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        flatNo: '',
        purpose: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/visitors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Visitor Entered');
                setFormData({ name: '', mobile: '', flatNo: '', purpose: '' });
                router.push('/security/active');
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
            <h1 style={{ marginBottom: '2rem' }}>New Visitor Entry</h1>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Visitor Name</label>
                        <input
                            type="text"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Mobile Number</label>
                            <input
                                type="tel"
                                required
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                                value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Dst Flat No</label>
                            <input
                                type="text"
                                required
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                                value={formData.flatNo}
                                onChange={e => setFormData({ ...formData, flatNo: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Purpose</label>
                        <select
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--input))' }}
                            value={formData.purpose}
                            onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                        >
                            <option value="">Select Purpose</option>
                            <option value="Guest">Guest</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Cab">Cab</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>{loading ? 'Logging...' : 'Log Entry'}</button>
                </form>
            </div>
        </div>
    );
}
