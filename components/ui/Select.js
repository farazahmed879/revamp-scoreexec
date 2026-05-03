'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';

export default function Select({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  error,
  required = false,
  disabled = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  const selectedOption = options.find(o => String(o.value) === String(value));

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300; // Estimated max height
      setOpenUp(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(name, option.value);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className={`${styles.field} ${className}`} ref={ref}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${error ? styles.hasError : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggle}
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>▾</span>
      </div>

      {isOpen && (
        <div className={`${styles.dropdown} ${openUp ? styles.dropdownUp : ''}`}>
          {options.length > 5 && (
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
            </div>
          )}
          <div className={styles.optionsList}>
            {filtered.length === 0 ? (
              <div className={styles.noResults}>No results found</div>
            ) : (
              filtered.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${String(option.value) === String(value) ? styles.selected : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
