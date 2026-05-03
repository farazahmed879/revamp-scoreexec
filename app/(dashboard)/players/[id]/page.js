'use client';

import { useParams } from 'next/navigation';
import { useCallback, useState, useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { playersService } from '@/services/playersService';
import { getBattingStyleLabel, getBowlingStyleLabel } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import styles from './profile.module.css';

export default function PlayerProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Stats');
  const [filters, setFilters] = useState({
    tournamentId: '',
    teamId: ''
  });

  const tabs = [
    { id: 'Stats', label: 'Stats', icon: '📊' },
    { id: 'Matches', label: 'Matches', icon: '📅' },
    { id: 'Tournaments', label: 'Tournaments', icon: '🏆' },
    { id: 'Teams', label: 'Teams', icon: '🛡️' },
    { id: 'Badges', label: 'Badges', icon: '🎖️' },
    { id: 'Trophies', label: 'Trophies', icon: '🥇' }
  ];

  const apiParams = useMemo(() => {
    const params = {};
    if (filters.tournamentId) params.tournamentId = filters.tournamentId;
    if (filters.teamId) params.teamId = filters.teamId;
    return params;
  }, [filters]);

  const { data: profile, loading, error } = useApi(
    useCallback(() => playersService.getProfile(id, apiParams), [id, apiParams])
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ tournamentId: '', teamId: '' });
  };

  if (loading && !profile) {
    return (
      <div className={styles.container}>
        <Skeleton height={160} />
        <div className={styles.statsGrid}>
          <Skeleton height={300} />
          <Skeleton height={300} />
          <Skeleton height={200} />
        </div>
      </div>
    );
  }

  if (error) return <div className={styles.errorContainer}>{error}</div>;
  if (!profile) return <div className={styles.errorContainer}>Player not found.</div>;

  return (
    <div className={styles.container}>
      {/* <PageHeader 
        title="Player Profile" 
        description={`View detailed statistics for ${profile.fullName}`} 
      /> */}

      <div className={`${styles.profileHeader} animate-fade-in`}>
        <div className={styles.avatar}>
          {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
        </div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{profile.fullName}</h1>
            {profile.jerseyNumber && (
              <span className={styles.jersey}>#{profile.jerseyNumber}</span>
            )}
            <Badge variant={profile.isActive ? 'success' : 'danger'}>
              {profile.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className={styles.styles}>
            <div className={styles.styleItem}>
              <span className={styles.label}>Batting Style</span>
              <span className={styles.value}>{getBattingStyleLabel(profile.battingStyle)}</span>
            </div>
            <div className={styles.styleItem}>
              <span className={styles.label}>Bowling Style</span>
              <span className={styles.value}>{getBowlingStyleLabel(profile.bowlingStyle)}</span>
            </div>
          </div>
        </div>
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
            {/* Filter Bar */}
            <div className={styles.filterBar}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Tournament</label>
                <select 
                  name="tournamentId" 
                  className={styles.filterSelect}
                  value={filters.tournamentId}
                  onChange={handleFilterChange}
                >
                  <option value="">All Tournaments</option>
                  {profile.playedTournaments.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Team</label>
                <select 
                  name="teamId" 
                  className={styles.filterSelect}
                  value={filters.teamId}
                  onChange={handleFilterChange}
                >
                  <option value="">All Teams</option>
                  {profile.playedTeams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              {(filters.tournamentId || filters.teamId) && (
                <button className={styles.clearButton} onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>

            <div className={`${styles.statsGrid} stagger-children`}>
              {/* Batting Stats */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🏏 Batting Stats</h2>
                <div className={styles.statsList}>
                  <StatItem label="Matches" value={profile.battingStats.matches} />
                  <StatItem label="Innings" value={profile.battingStats.innings} />
                  <StatItem label="Runs" value={profile.battingStats.runs} />
                  <StatItem label="Balls" value={profile.battingStats.ballsFaced} />
                  <StatItem label="Avg" value={profile.battingStats.average || '-'} />
                  <StatItem label="S/R" value={profile.battingStats.strikeRate || '-'} />
                  <StatItem label="HS" value={profile.battingStats.highScore} />
                  <StatItem label="100s" value={profile.battingStats.hundreds} />
                  <StatItem label="50s" value={profile.battingStats.fifties} />
                </div>
              </section>

              {/* Bowling Stats */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🏐 Bowling Stats</h2>
                <div className={styles.statsList}>
                  <StatItem label="Innings" value={profile.bowlingStats.innings} />
                  <StatItem label="Overs" value={profile.bowlingStats.overs} />
                  <StatItem label="Wickets" value={profile.bowlingStats.wickets} />
                  <StatItem label="Runs" value={profile.bowlingStats.runsConceded} />
                  <StatItem label="Econ" value={profile.bowlingStats.economy || '-'} />
                  <StatItem label="Avg" value={profile.bowlingStats.average || '-'} />
                  <StatItem label="Best" value={profile.bowlingStats.bestBowling || '-'} />
                  <StatItem label="5W" value={profile.bowlingStats.fiveWicketHauls} />
                </div>
              </section>

              {/* Fielding Stats */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🧤 Fielding Stats</h2>
                <div className={styles.statsList}>
                  <StatItem label="Catches" value={profile.fieldingStats.catches} />
                  <StatItem label="Stumpings" value={profile.fieldingStats.stumpings} />
                  <StatItem label="Run Outs" value={profile.fieldingStats.runOuts} />
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'Matches' && (
          <div className="animate-fade-in">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📅 Played Matches</h2>
              <div className={styles.list}>
                {profile.playedMatches.length > 0 ? profile.playedMatches.map(match => (
                  <div key={match.id} className={styles.listItem}>
                    <div className={styles.itemMain}>
                      <span className={styles.itemName}>{match.opponentTeam}</span>
                      <span className={styles.itemSub}>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="ghost">{match.result}</Badge>
                  </div>
                )) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📅</span>
                    <p>No matches recorded yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'Tournaments' && (
          <div className="animate-fade-in">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🏆 Played Tournaments</h2>
              <div className={styles.list}>
                {profile.playedTournaments.length > 0 ? profile.playedTournaments.map(tournament => (
                  <div key={tournament.id} className={styles.listItem}>
                    <span className={styles.itemName}>{tournament.name}</span>
                  </div>
                )) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>🏆</span>
                    <p>No tournaments played yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'Teams' && (
          <div className="animate-fade-in">
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🛡️ Played Teams</h2>
              <div className={styles.list}>
                {profile.playedTeams.length > 0 ? profile.playedTeams.map(team => (
                  <div key={team.id} className={styles.listItem}>
                    <span className={styles.itemName}>{team.name}</span>
                  </div>
                )) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>🛡️</span>
                    <p>No teams recorded.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'Badges' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🎖️</span>
              <h3>No Badges Earned</h3>
              <p>Keep playing to earn special badges and recognition!</p>
            </div>
          </div>
        )}

        {activeTab === 'Trophies' && (
          <div className="animate-fade-in">
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🥇</span>
              <h3>No Trophies Yet</h3>
              <p>Win tournaments and matches to fill your trophy cabinet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
