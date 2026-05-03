'use client';

import { useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import { playersService } from '@/services/playersService';
import { teamsService } from '@/services/teamsService';
import { matchesService } from '@/services/matchesService';
import { tournamentsService } from '@/services/tournamentsService';
import StatCard from '@/components/ui/StatCard';
import Card, { CardBody } from '@/components/ui/Card';
import PageHeader from '@/components/layout/PageHeader';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: players, loading: loadingPlayers } = useApi(
    useCallback(() => playersService.getAll(), [])
  );
  const { data: teams, loading: loadingTeams } = useApi(
    useCallback(() => teamsService.getAll(), [])
  );
  const { data: matches, loading: loadingMatches } = useApi(
    useCallback(() => matchesService.getAll(), [])
  );
  const { data: tournaments, loading: loadingTournaments } = useApi(
    useCallback(() => tournamentsService.getAll(), [])
  );

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title={`${greeting()}, ${user?.fullName?.split(' ')[0] || 'there'}! 👋`}
        description="Here's what's happening with your sports platform today."
      />

      {/* Stat Cards */}
      <div className={`${styles.statsGrid} stagger-children`}>
        <StatCard
          icon="🏏"
          label="Total Players"
          value={loadingPlayers ? '...' : (players?.length ?? 0)}
          color="blue"
        />
        <StatCard
          icon="👥"
          label="Total Teams"
          value={loadingTeams ? '...' : (teams?.length ?? 0)}
          color="green"
        />
        <StatCard
          icon="⚔️"
          label="Total Matches"
          value={loadingMatches ? '...' : (matches?.length ?? 0)}
          color="purple"
        />
        <StatCard
          icon="🏆"
          label="Tournaments"
          value={loadingTournaments ? '...' : (tournaments?.length ?? 0)}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <a href="/players/create" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionLabel}>Add Player</span>
          </a>
          <a href="/teams/create" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionLabel}>Add Team</span>
          </a>
          <a href="/matches/create" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionLabel}>Create Match</span>
          </a>
          <a href="/tournaments" className={styles.actionCard}>
            <span className={styles.actionIcon}>📋</span>
            <span className={styles.actionLabel}>View Tournaments</span>
          </a>
        </div>
      </div>

      {/* Platform Info */}
      <Card>
        <CardBody>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Platform</span>
              <span className={styles.infoValue}>ScorEXEC v1.0</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Tenant</span>
              <span className={styles.infoValue}>{user?.tenantId?.slice(0, 8) || '—'}...</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Role</span>
              <span className={styles.infoValue}>{user?.role || '—'}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
