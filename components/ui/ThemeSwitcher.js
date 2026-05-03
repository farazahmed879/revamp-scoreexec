'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.switcher} 
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={styles.icon}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
