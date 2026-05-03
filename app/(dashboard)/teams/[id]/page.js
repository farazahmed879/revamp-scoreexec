'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { teamsService } from '@/services/teamsService';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import DataTable from '@/components/ui/DataTable';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { getBattingStyleLabel, getBowlingStyleLabel } from '@/constants/enums';
import styles from './profile.module.css';

export default function TeamProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Players');

  const tabs = [
    { id: 'Stats', label: 'Stats', icon: '📊' },
    { id: 'Matches', label: 'Matches', icon: '📅' },
    { id: 'Tournaments', label: 'Tournaments', icon: '🏆' },
    { id: 'Players', label: 'Players', icon: '👥' },
    { id: 'Trophies', label: 'Trophies', icon: '🥇' }
  ];

  const { data: profile, loading, error } = useApi(
    useCallback(() => teamsService.getProfile(id), [id])
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <Skeleton height={120} />
        <div className={styles.grid}>
          <Skeleton height={400} />
          <Skeleton height={400} />
        </div>
      </div>
    );
  }

  if (error) return <div className={styles.errorContainer}>{error}</div>;
  if (!profile) return <div className={styles.errorContainer}>Team not found.</div>;

  const playerColumns = [
    { title: 'Name', key: 'fullName', dataIndex: 'fullName' },
    { title: 'Jersey #', key: 'jerseyNumber', dataIndex: 'jerseyNumber', render: (v) => v ?? '—' },
    { title: 'Batting', key: 'battingStyle', dataIndex: 'battingStyle', render: (v) => getBattingStyleLabel(v) },
    { title: 'Bowling', key: 'bowlingStyle', dataIndex: 'bowlingStyle', render: (v) => getBowlingStyleLabel(v) },
  ];

  const matchColumns = [
    { title: 'Opponent', key: 'opponentName', dataIndex: 'opponentName' },
    { title: 'Date', key: 'date', dataIndex: 'date', render: (v) => new Date(v).toLocaleDateString() },
    { title: 'Result', key: 'result', dataIndex: 'result', render: (v) => <Badge variant="info">{v}</Badge> },
  ];

  return (
    <div className={styles.container}>
      <PageHeader 
        title={profile.name} 
        description="Team Profile & Roster"
      />

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'Stats' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📊</span>
              <h3>No Stats Available</h3>
              <p>Team statistics will be available soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'Matches' && (
          <div className="animate-fade-in">
            <Card title="Recent Matches">
              <CardBody>
                <DataTable 
                  columns={matchColumns} 
                  data={profile.recentMatches} 
                  onRowClick={(row) => router.push(`/matches/${row.id}`)}
                  emptyMessage="No recent matches found."
                />
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'Tournaments' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🏆</span>
              <h3>No Tournaments Joined</h3>
              <p>Join tournaments to see them listed here.</p>
            </div>
          </div>
        )}

        {activeTab === 'Players' && (
          <div className="animate-fade-in">
            <Card title="Team Roster">
              <CardBody>
                <DataTable 
                  columns={playerColumns} 
                  data={profile.players} 
                  onRowClick={(row) => router.push(`/players/${row.id}`)}
                  emptyMessage="No players assigned to this team."
                />
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'Trophies' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🥇</span>
              <h3>No Trophies Yet</h3>
              <p>Win matches and tournaments to earn trophies.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
