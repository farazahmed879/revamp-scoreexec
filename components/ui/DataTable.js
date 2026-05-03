'use client';

import { useState } from 'react';
import styles from './DataTable.module.css';
import { TableSkeleton } from './Skeleton';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data found',
  onRowClick,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (!key) return;
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey] ?? '';
        const bVal = b[sortKey] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : data;

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <TableSkeleton rows={5} cols={columns.length || 4} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${styles.th} ${col.sortable !== false ? styles.sortable : ''}`}
                  onClick={() => col.sortable !== false && handleSort(col.dataIndex || col.key)}
                  style={col.width ? { width: col.width } : undefined}
                >
                  <span className={styles.thContent}>
                    {col.title}
                    {sortKey === (col.dataIndex || col.key) && (
                      <span className={styles.sortIcon}>
                        {sortDir === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  <div className={styles.emptyContent}>
                    <span className={styles.emptyIcon}>📋</span>
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIdx) => (
                <tr
                  key={row.id || row.key || rowIdx}
                  className={`${styles.row} ${onRowClick ? styles.clickable : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      {col.render
                        ? col.render(row[col.dataIndex], row, rowIdx)
                        : row[col.dataIndex] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {sortedData.length > 0 && (
        <div className={styles.footer}>
          <span className={styles.count}>
            Showing {sortedData.length} {sortedData.length === 1 ? 'record' : 'records'}
          </span>
        </div>
      )}
    </div>
  );
}
