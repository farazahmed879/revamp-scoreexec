'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import styles from './Header.module.css';

export default function Header({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.toggle} onClick={onToggle} aria-label="Toggle sidebar">
          <span className={styles.hamburger}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={styles.right}>
        <ThemeSwitcher />
        <div className={styles.userContainer}>
          <div className={styles.userInfo} onClick={() => setShowDropdown(!showDropdown)}>
            <div className={styles.avatar}>
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className={styles.userMeta}>
              <span className={styles.userName}>{user?.fullName || 'User'}</span>
              <span className={styles.userRole}>{user?.role || 'Member'}</span>
            </div>
          </div>

          {showDropdown && (
            <div className={styles.dropdown}>
              <Link href="/account" className={styles.dropdownItem} onClick={() => setShowDropdown(false)}>
                ⚙️ Account Settings
              </Link>
              <button className={styles.dropdownItem} onClick={logout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
