'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Members', href: '/admin/members' },
        { label: 'Billing', href: '/admin/billing' },
        { label: 'Complaints', href: '/admin/complaints' },
        { label: 'Notices', href: '/admin/notices' },
        { label: 'Visitors', href: '/admin/visitors' },
    ];

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    Admin Config
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
