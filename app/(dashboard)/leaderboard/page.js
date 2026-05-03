'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { leaderboardService } from '@/services/leaderboardService';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardBody } from '@/components/ui/Card';
import DataTable from '@/components/ui/DataTable';
import styles from './leaderboard.module.css';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('runs');
  const router = useRouter();

  const fetchFn = useCallback(() => {
    switch (activeTab) {
      case 'runs': return leaderboardService.getMostRuns();
      case 'wickets': return leaderboardService.getMostWickets();
      case 'sixes': return leaderboardService.getMostSixes();
      case 'fours': return leaderboardService.getMostFours();
      default: return leaderboardService.getMostRuns();
    }
  }, [activeTab]);

  const { data, loading } = useApi(fetchFn, [activeTab]);

  const columns = [
    { title: 'Rank', key: 'rank', render: (_, __, idx) => idx + 1, width: 60 },
    { title: 'Player', key: 'playerName', dataIndex: 'playerName' },
    { 
      title: activeTab === 'runs' ? 'Runs' : 
             activeTab === 'wickets' ? 'Wickets' : 
             activeTab === 'sixes' ? 'Sixes' : 'Fours', 
      key: 'value', 
      dataIndex: 'value',
      render: (v) => <strong className={styles.value}>{v}</strong>
    },
    { title: 'Matches', key: 'matches', dataIndex: 'matches' },
  ];

  const tabs = [
    { id: 'runs', label: 'Most Runs' },
    { id: 'wickets', label: 'Most Wickets' },
    { id: 'sixes', label: 'Most Sixes' },
    { id: 'fours', label: 'Most Fours' },
  ];

  return (
    <>
      <PageHeader title="Leaderboard" description="Top performing players across the platform" />

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        <CardBody>
          <DataTable 
            columns={columns} 
            data={data || []} 
            loading={loading} 
            onRowClick={(row) => router.push(`/players/${row.playerId}`)}
            emptyMessage="No data available for this category."
          />
        </CardBody>
      </Card>
    </>
  );
}
