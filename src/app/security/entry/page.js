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
            <div className="page-header">
                <h1>New Visitor Entry</h1>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label>Visitor Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                required
                                className="font-mono"
                                value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                placeholder="9876543210"
                            />
                        </div>
                        <div>
                            <label>Dst Flat No</label>
                            <input
                                type="text"
                                required
                                value={formData.flatNo}
                                onChange={e => setFormData({ ...formData, flatNo: e.target.value })}
                                placeholder="A-101"
                            />
                        </div>
                    </div>

                    <div>
                        <label>Purpose</label>
                        <select
                            value={formData.purpose}
                            onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                            required
                        >
                            <option value="">Select Purpose</option>
                            <option value="Guest">Guest</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Cab">Cab</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                            {loading ? 'Logging...' : 'Log Entry'}
                        </button>
                        <button type="button" className="btn btn-outline" onClick={() => router.push('/security/active')}>
                            View Active
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
