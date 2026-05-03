'use client';

import { useState } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from './dashboard.module.css';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard>
      <div className={styles.layout}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className={`${styles.main} ${collapsed ? styles.mainCollapsed : ''}`}>
          <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
