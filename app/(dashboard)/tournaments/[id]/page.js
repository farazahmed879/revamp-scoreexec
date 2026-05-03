'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { tournamentsService } from '@/services/tournamentsService';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardBody } from '@/components/ui/Card';
import DataTable from '@/components/ui/DataTable';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import styles from './profile.module.css';

export default function TournamentProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Teams');

  const tabs = [
    { id: 'Stats', label: 'Stats', icon: '📊' },
    { id: 'Matches', label: 'Matches', icon: '📅' },
    { id: 'Teams', label: 'Teams', icon: '🛡️' },
    { id: 'Points Table', label: 'Points Table', icon: '🔢' },
    { id: 'Gallery', label: 'Gallery', icon: '🖼️' }
  ];

  const { data: profile, loading, error } = useApi(
    useCallback(() => tournamentsService.getProfile(id), [id])
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
  if (!profile) return <div className={styles.errorContainer}>Tournament not found.</div>;

  const teamColumns = [
    { title: 'Team Name', key: 'name', dataIndex: 'name' },
  ];

  const matchColumns = [
    { title: 'Match', key: 'teams', render: (_, row) => `${row.teamA} vs ${row.teamB}` },
    { title: 'Date', key: 'date', dataIndex: 'date', render: (v) => new Date(v).toLocaleDateString() },
    { title: 'Status', key: 'status', dataIndex: 'status', render: (v) => <Badge variant="info">{v}</Badge> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerWithLogo}>
        {profile.logoUrl && (
          <img src={profile.logoUrl} alt={profile.name} className={styles.headerLogo} />
        )}
        <PageHeader 
          title={profile.name} 
          description={`${profile.type} • ${profile.description || 'Tournament Details'}`}
        />
      </div>

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
              <p>Tournament statistics will be available once more matches are played.</p>
            </div>
          </div>
        )}

        {activeTab === 'Matches' && (
          <div className="animate-fade-in">
            <Card title="Schedule & Results">
              <CardBody>
                <DataTable 
                  columns={matchColumns} 
                  data={profile.matches} 
                  onRowClick={(row) => router.push(`/matches/${row.id}`)}
                  emptyMessage="No matches scheduled."
                />
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'Teams' && (
          <div className="animate-fade-in">
            <Card title="Participating Teams">
              <CardBody>
                <DataTable 
                  columns={teamColumns} 
                  data={profile.teams} 
                  onRowClick={(row) => router.push(`/teams/${row.id}`)}
                  emptyMessage="No teams registered for this tournament."
                />
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'Points Table' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔢</span>
              <h3>Points Table Coming Soon</h3>
              <p>Standings will be updated as matches conclude.</p>
            </div>
          </div>
        )}

        {activeTab === 'Gallery' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🖼️</span>
              <h3>No Media Found</h3>
              <p>Tournament photos and videos will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
