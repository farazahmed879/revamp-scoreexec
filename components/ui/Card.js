'use client';

import styles from './Card.module.css';

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div className={`${styles.card} ${hover ? styles.hover : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
}
