'use client';

import styles from './StatCard.module.css';

export default function StatCard({ icon, label, value, trend, color = 'blue' }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.iconBox}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.value}>{value ?? '—'}</span>
        <span className={styles.label}>{label}</span>
      </div>
      {trend !== undefined && (
        <span className={`${styles.trend} ${trend >= 0 ? styles.up : styles.down}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
  );
}
