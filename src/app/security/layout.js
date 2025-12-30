'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SecurityLayout({ children }) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { label: 'Gate Entry', href: '/security/entry' },
        { label: 'Active Visitors', href: '/security/active' },
        { label: 'Emergency', href: '/security/emergency' },
    ];

    return (
        <div className="dashboard-layout">
            {/* Mobile Header */}
            <header className="mobile-header">
                <span style={{ fontWeight: 700 }}>Main Gate</span>
                <button
                    className="mobile-toggle"
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                >
                    ☰
                </button>
            </header>

            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    Main Gate
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
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

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
