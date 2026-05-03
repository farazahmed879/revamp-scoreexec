'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/players', label: 'Players', icon: '🏏' },
  { path: '/teams', label: 'Teams', icon: '👥' },
  { path: '/tournaments', label: 'Tournaments', icon: '🏆' },
  { path: '/matches', label: 'Matches', icon: '⚔️' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '🏅' },
  { divider: true },
  { path: '/tenants', label: 'Tenants', icon: '🏢' },
  { path: '/users', label: 'Users', icon: '👤' },
  { path: '/roles', label: 'Roles', icon: '🔑' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          {!collapsed && <span className={styles.logoText}>ScorEXEC</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navItems.map((item, idx) => {
          if (item.divider) {
            return <div key={idx} className={styles.divider} />;
          }
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              {!collapsed && isActive(item.path) && <span className={styles.activeIndicator} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={styles.footer}>
        <button
          className={styles.logoutBtn}
          onClick={logout}
          title={collapsed ? 'Log Out' : undefined}
        >
          <span className={styles.navIcon}>🚪</span>
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
