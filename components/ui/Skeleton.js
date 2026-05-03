'use client';

import styles from './Skeleton.module.css';

export default function Skeleton({ width, height = 16, borderRadius, className = '' }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius: borderRadius || 'var(--radius-sm)' }}
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} width="100%" height={14} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className={styles.tableRow}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} width={`${60 + Math.random() * 40}%`} height={14} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton width={40} height={40} borderRadius="var(--radius-md)" />
      <Skeleton width="60%" height={20} />
      <Skeleton width="40%" height={14} />
    </div>
  );
}

export function SkeletonGrid({ cards = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: cards }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
