export default function EmergencyPage() {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Emergency Contacts</h1>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="card" style={{ borderColor: 'hsl(var(--destructive))' }}>
                    <h3 style={{ color: 'hsl(var(--destructive))' }}>Police</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>100</div>
                </div>
                <div className="card" style={{ borderColor: 'hsl(var(--destructive))' }}>
                    <h3 style={{ color: 'hsl(var(--destructive))' }}>Ambulance</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>102</div>
                </div>
                <div className="card" style={{ borderColor: 'hsl(var(--destructive))' }}>
                    <h3 style={{ color: 'hsl(var(--destructive))' }}>Fire Brigade</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>101</div>
                </div>
                <div className="card">
                    <h3>Society Secretary</h3>
                    <div style={{ fontSize: '1.5rem' }}>+91 99999 99999</div>
                </div>
            </div>
        </div>
    );
}
