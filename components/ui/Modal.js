'use client';

import { useEffect } from 'react';
import styles from './Modal.module.css';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  confirmVariant = 'danger',
  cancelText = 'Cancel',
  loading = false,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <div className={styles.body}>{children}</div>
        {onConfirm && (
          <div className={styles.footer}>
            <Button variant="ghost" onClick={onClose}>{cancelText}</Button>
            <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
