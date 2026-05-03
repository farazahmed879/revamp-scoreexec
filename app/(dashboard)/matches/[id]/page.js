'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { matchesService } from '@/services/matchesService';
import { getMatchStatusLabel, getTossDecisionLabel } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { TableSkeleton } from '@/components/ui/Skeleton';
import styles from './match.module.css';

export default function MatchDetailPage() {
  const { id } = useParams();
  const { data: match, loading } = useApi(
    useCallback(() => matchesService.getById(id), [id])
  );

  if (loading) return <TableSkeleton rows={10} />;
  if (!match) return <p>Match not found.</p>;

  const statusVariant = (status) => {
    if (status === 1) return 'info';
    if (status === 2) return 'success';
    if (status === 3) return 'default';
    return 'danger';
  };

  const tossWinnerName = match.tossWinnerId === match.homeTeamId ? match.homeTeamName : match.awayTeamName;

  return (
    <div className={styles.page}>
      <PageHeader
        title={`${match.homeTeamName} vs ${match.awayTeamName}`}
        description={`${match.venue} • ${new Date(match.scheduledAt).toLocaleString()}`}
      >
        <Badge variant={statusVariant(match.status)}>{getMatchStatusLabel(match.status)}</Badge>
        {match.status === 2 && (
          <Link href={`/matches/${id}/scoring`}>
            <Button variant="primary" icon="🏏">Go to Scoring</Button>
          </Link>
        )}
      </PageHeader>

      <div className={styles.grid}>
        {/* Info Card */}
        <Card>
          <CardHeader><h3>Match Information</h3></CardHeader>
          <CardBody className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Toss</span>
              <span className={styles.infoValue}>
                {match.tossWinnerId ? `${tossWinnerName} won & chose to ${getTossDecisionLabel(match.tossDecision).toLowerCase()}` : 'Not held yet'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Total Overs</span>
              <span className={styles.infoValue}>{match.totalOvers} Overs</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Venue</span>
              <span className={styles.infoValue}>{match.venue}</span>
            </div>
          </CardBody>
        </Card>

        {/* Innings Summary */}
        <div className={styles.inningsGrid}>
          {match.innings.map((inn) => (
            <Card key={inn.id} className={styles.innCard}>
              <CardBody>
                <div className={styles.innHeader}>
                  <span className={styles.innNum}>Innings {inn.inningsNumber}</span>
                  <Badge variant={inn.isCompleted ? 'default' : 'success'}>
                    {inn.isCompleted ? 'Completed' : 'Live'}
                  </Badge>
                </div>
                <div className={styles.innScore}>
                  <span className={styles.innTeam}>{inn.battingTeamName}</span>
                  <span className={styles.innRuns}>{inn.totalRuns}/{inn.totalWickets}</span>
                </div>
                <div className={styles.innMeta}>
                  <span>Overs: {inn.totalOvers}</span>
                  <span>RR: {(inn.totalRuns / (inn.totalOvers || 1)).toFixed(2)}</span>
                </div>
              </CardBody>
            </Card>
          ))}
          {match.innings.length === 0 && (
            <Card>
              <CardBody className={styles.emptyInn}>
                <p>No innings started yet.</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
