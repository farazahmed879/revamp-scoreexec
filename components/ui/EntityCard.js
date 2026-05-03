'use client';

import styles from './EntityCard.module.css';

export default function EntityCard({ 
  title, 
  subtitle, 
  icon, 
  image,
  stats = [], 
  status, 
  statusVariant = 'default',
  onClick,
  actions
}) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {image ? (
            <img src={image} alt={title} className={styles.image} />
          ) : (
            icon
          )}
        </div>
        {status && (
          <span className={`${styles.badge} badge-${statusVariant}`}>
            {status}
          </span>
        )}
      </div>

      <div className={styles.content}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>

      {stats.length > 0 && (
        <div className={styles.stats}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {actions && (
        <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
          {actions}
        </div>
      )}
    </div>
  );
}

export function EntityGrid({ children }) {
  return <div className={children?.length > 3 ? styles.grid : styles.gridSparse}>{children}</div>;
}
