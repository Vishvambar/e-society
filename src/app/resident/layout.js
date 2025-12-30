'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ResidentLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/resident/dashboard' },
        { label: 'Complaints', href: '/resident/complaints' },
        { label: 'Notices', href: '/resident/notices' },
        { label: 'Payments', href: '/resident/payments' },
    ];

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    My Home
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div style={{ flex: 1 }}></div>
                    <Link href="/login" className="nav-item">
                        Logout
                    </Link>
                </nav>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
