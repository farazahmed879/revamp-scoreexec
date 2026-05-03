'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './MultiSelect.module.css';

export default function MultiSelect({ 
  label, 
  options = [], 
  value = [], 
  onChange, 
  placeholder = 'Select options...',
  name,
  error
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 240; // Max height defined in CSS
      setOpenUp(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }
    setIsOpen(!isOpen);
  };

  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    
    onChange(name, newValue);
  };

  const removeValue = (e, val) => {
    e.stopPropagation();
    onChange(name, value.filter(v => v !== val));
  };

  const selectedOptions = options.filter(opt => value.includes(opt.value));

  return (
    <div className={styles.container} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div 
        className={`${styles.control} ${isOpen ? styles.controlFocused : ''}`}
        onClick={handleToggle}
      >
        {selectedOptions.length > 0 ? (
          <div className={styles.tags}>
            {selectedOptions.map(opt => (
              <span key={opt.value} className={styles.tag}>
                {opt.label}
                <span 
                  className={styles.removeTag} 
                  onClick={(e) => removeValue(e, opt.value)}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className={`${styles.dropdown} ${openUp ? styles.dropdownUp : ''}`}>
          {options.length > 0 ? options.map(opt => (
            <div 
              key={opt.value} 
              className={`${styles.option} ${value.includes(opt.value) ? styles.optionSelected : ''}`}
              onClick={() => toggleOption(opt.value)}
            >
              {opt.label}
              {value.includes(opt.value) && <span>✓</span>}
            </div>
          )) : (
            <div className={styles.option} style={{ cursor: 'default' }}>No options available</div>
          )}
        </div>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
