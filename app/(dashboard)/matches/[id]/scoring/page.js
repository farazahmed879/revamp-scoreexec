'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { matchesService } from '@/services/matchesService';
import { scoringService } from '@/services/scoringService';
import { teamsService } from '@/services/teamsService';
import { wicketTypeOptions } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { TableSkeleton } from '@/components/ui/Skeleton';
import styles from './scoring.module.css';

export default function ScoringPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const { data: match, loading, refetch } = useApi(
    useCallback(() => matchesService.getById(id), [id])
  );

  // Local State
  const [isWicketModalOpen, setIsWicketModalOpen] = useState(false);
  const [isNewOverModalOpen, setIsNewOverModalOpen] = useState(false);
  const [isNewBatsmanModalOpen, setIsNewBatsmanModalOpen] = useState(false);
  
  const [strikerId, setStrikerId] = useState('');
  const [nonStrikerId, setNonStrikerId] = useState('');
  const [newBowlerId, setNewBowlerId] = useState('');
  const [newBatsmanId, setNewBatsmanId] = useState('');
  const [wicketType, setWicketType] = useState(1);

  const [recording, setRecording] = useState(false);

  // Derived Data
  const currentInnings = useMemo(() => match?.innings.find(i => !i.isCompleted) || match?.innings[match?.innings.length - 1], [match]);
  const currentOver = useMemo(() => currentInnings?.overs.find(o => !o.isCompleted) || currentInnings?.overs[currentInnings?.overs.length - 1], [currentInnings]);
  
  // Set initial batsmen from squad if not set
  useEffect(() => {
    if (currentInnings && !strikerId) {
      // In a real app, we'd track who is currently batting in the DB
      // For now, let's just let the user select them if they aren't set
    }
  }, [currentInnings, strikerId]);

  // Loading Team Players for modals
  const { data: battingPlayers } = useApi(
    useCallback(() => currentInnings ? teamsService.getPlayers(currentInnings.battingTeamId) : Promise.resolve({ data: [] }), [currentInnings])
  );
  const { data: bowlingPlayers } = useApi(
    useCallback(() => currentInnings ? teamsService.getPlayers(currentInnings.bowlingTeamId) : Promise.resolve({ data: [] }), [currentInnings])
  );

  const handleRecordBall = async (runs, extras = {}) => {
    if (!strikerId || !currentOver) {
      showToast('Please select striker and ensure over is started', 'warning');
      return;
    }

    setRecording(true);
    try {
      const ballNumber = (currentOver.deliveries?.length || 0) + 1;
      
      await scoringService.recordDelivery({
        inningsId: currentInnings.id,
        overId: currentOver.id,
        ballNumber,
        batsmanId: strikerId,
        bowlerId: currentOver.bowlerId,
        runsScored: runs,
        ...extras
      });

      // Simple strike rotation logic for frontend
      if ((runs % 2 !== 0 && !extras.isWide && !extras.isNoBall) || 
          (runs % 2 === 0 && (extras.isWide || extras.isNoBall) && runs > 0)) {
        setStrikerId(nonStrikerId);
        setNonStrikerId(strikerId);
      }

      await refetch();
      
      // Check if over completed (6 legal balls)
      const legalBalls = (currentOver.deliveries?.filter(d => !d.isWide && !d.isNoBall).length || 0) + (!extras.isWide && !extras.isNoBall ? 1 : 0);
      if (legalBalls >= 6) {
        setIsNewOverModalOpen(true);
      }

      if (extras.isWicket) {
        setIsNewBatsmanModalOpen(true);
      }
      
    } catch (err) {
      showToast('Failed to record delivery', 'error');
    } finally {
      setRecording(false);
    }
  };

  const startNewOver = async () => {
    try {
      await matchesService.createOver(id, {
        inningsId: currentInnings.id,
        overNumber: currentInnings.overs.length + 1,
        bowlerId: newBowlerId
      });
      // Rotate strike at end of over
      const s = strikerId;
      setStrikerId(nonStrikerId);
      setNonStrikerId(s);
      
      setIsNewOverModalOpen(false);
      await refetch();
    } catch (err) {
      showToast('Failed to start new over', 'error');
    }
  };

  if (loading) return <TableSkeleton rows={15} />;
  if (!match) return <p>Match not found.</p>;
  if (!currentInnings) return <p>No active innings found. Please start the match first.</p>;

  return (
    <div className={styles.page}>
      <PageHeader 
        title={`${currentInnings.battingTeamName} Innings`} 
        description={`${match.homeTeamName} vs ${match.awayTeamName} • Live from ${match.venue}`}
      >
        <Badge variant="success">LIVE</Badge>
      </PageHeader>

      {/* Main Scoreboard */}
      <Card className={styles.scoreboard}>
        <CardBody className={styles.scoreBody}>
          <div className={styles.mainScore}>
            <div className={styles.runsBox}>
              <span className={styles.totalRuns}>{currentInnings.totalRuns}/{currentInnings.totalWickets}</span>
              <span className={styles.oversCount}>({currentInnings.totalOvers} ov)</span>
            </div>
            <div className={styles.rateBox}>
              <div className={styles.rateItem}>
                <span className={styles.rateLabel}>CRR</span>
                <span className={styles.rateValue}>{(currentInnings.totalRuns / (parseFloat(currentInnings.totalOvers) || 1)).toFixed(2)}</span>
              </div>
              {currentInnings.inningsNumber > 1 && (
                <div className={styles.rateItem}>
                  <span className={styles.rateLabel}>RRR</span>
                  <span className={styles.rateValue}>8.45</span> {/* Placeholder */}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.matchMeta}>
            <span>Target: 184</span> {/* Placeholder */}
            <span>Need 42 runs in 10 balls</span> {/* Placeholder */}
          </div>
        </CardBody>
      </Card>

      <div className={styles.grid}>
        {/* Left Col: Scoring Controls */}
        <div className={styles.controls}>
          <h3 className={styles.sectionTitle}>Record Delivery</h3>
          
          <div className={styles.btnGrid}>
            {[0, 1, 2, 3, 4, 6].map(r => (
              <button 
                key={r} 
                className={`${styles.scoreBtn} ${r >= 4 ? styles.boundary : ''}`}
                onClick={() => handleRecordBall(r)}
                disabled={recording}
              >
                {r}
              </button>
            ))}
          </div>

          <div className={styles.extrasRow}>
            <button className={styles.extraBtn} onClick={() => handleRecordBall(1, { isWide: true })} disabled={recording}>WD</button>
            <button className={styles.extraBtn} onClick={() => handleRecordBall(1, { isNoBall: true })} disabled={recording}>NB</button>
            <button className={styles.extraBtn} onClick={() => handleRecordBall(1, { isBye: true })} disabled={recording}>B</button>
            <button className={styles.extraBtn} onClick={() => handleRecordBall(1, { isLegBye: true })} disabled={recording}>LB</button>
            <button className={`${styles.extraBtn} ${styles.wicketBtn}`} onClick={() => setIsWicketModalOpen(true)} disabled={recording}>WICKET</button>
          </div>

          <div className={styles.overTimeline}>
             <h4>This Over</h4>
             <div className={styles.ballDots}>
               {currentOver?.deliveries.map((d, i) => (
                 <span key={i} className={`${styles.ballDot} ${d.isWicket ? styles.wicketBall : d.runsScored >= 4 ? styles.boundaryBall : ''}`}>
                   {d.isWicket ? 'W' : d.isWide ? 'Wd' : d.isNoBall ? 'Nb' : d.runsScored}
                 </span>
               ))}
               {(!currentOver || currentOver.deliveries.length === 0) && <span className={styles.emptyOver}>Waiting for first ball...</span>}
             </div>
          </div>
        </div>

        {/* Right Col: Players State */}
        <div className={styles.players}>
          <div className={styles.batsmenBox}>
             <h3 className={styles.sectionTitle}>Batting</h3>
             <div className={`${styles.playerCard} ${strikerId ? '' : styles.emptyPlayer}`} onClick={() => !strikerId && setIsNewBatsmanModalOpen(true)}>
                <div className={styles.playerInfo}>
                   <span className={styles.playerName}>{strikerId ? battingPlayers?.find(p => p.id === strikerId)?.fullName : 'Select Striker'}</span>
                   <span className={styles.playerMeta}>0 (0) • 0x4 0x6</span>
                </div>
                <Badge variant="info">Striker ★</Badge>
             </div>
             <div className={`${styles.playerCard} ${nonStrikerId ? '' : styles.emptyPlayer}`} onClick={() => !nonStrikerId && setIsNewBatsmanModalOpen(true)}>
                <div className={styles.playerInfo}>
                   <span className={styles.playerName}>{nonStrikerId ? battingPlayers?.find(p => p.id === nonStrikerId)?.fullName : 'Select Non-Striker'}</span>
                   <span className={styles.playerMeta}>0 (0) • 0x4 0x6</span>
                </div>
             </div>
          </div>

          <div className={styles.bowlerBox}>
             <h3 className={styles.sectionTitle}>Bowling</h3>
             <div className={styles.playerCard}>
                <div className={styles.playerInfo}>
                   <span className={styles.playerName}>{currentOver ? bowlingPlayers?.find(p => p.id === currentOver.bowlerId)?.fullName : 'No Bowler'}</span>
                   <span className={styles.playerMeta}>O: 2.3 • M: 0 • R: 18 • W: 1</span>
                </div>
                <Badge variant="purple">Current</Badge>
             </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={isWicketModalOpen} 
        onClose={() => setIsWicketModalOpen(false)} 
        title="Wicket Configuration"
        onConfirm={() => {
          setIsWicketModalOpen(false);
          handleRecordBall(0, { isWicket: true, wicketType });
        }}
        confirmText="Confirm Wicket"
      >
        <Select 
          label="Wicket Type" 
          options={wicketTypeOptions} 
          value={wicketType} 
          onChange={(n, v) => setWicketType(v)} 
        />
      </Modal>

      <Modal 
        isOpen={isNewOverModalOpen} 
        onClose={() => setIsNewOverModalOpen(false)} 
        title="Over Completed"
        onConfirm={startNewOver}
        confirmText="Start Next Over"
      >
        <p>Select the next bowler for Over {currentInnings.overs.length + 1}</p>
        <Select 
          label="Next Bowler" 
          options={bowlingPlayers?.map(p => ({ value: p.id, label: p.fullName })) || []} 
          value={newBowlerId} 
          onChange={(n, v) => setNewBowlerId(v)} 
        />
      </Modal>

      <Modal
        isOpen={isNewBatsmanModalOpen}
        onClose={() => setIsNewBatsmanModalOpen(false)}
        title="Select Batsman"
        onConfirm={() => {
          if (!strikerId) setStrikerId(newBatsmanId);
          else setNonStrikerId(newBatsmanId);
          setIsNewBatsmanModalOpen(false);
        }}
        confirmText="Add to Crease"
      >
        <Select 
          label="Select Player" 
          options={battingPlayers?.filter(p => p.id !== strikerId && p.id !== nonStrikerId).map(p => ({ value: p.id, label: p.fullName })) || []} 
          value={newBatsmanId} 
          onChange={(n, v) => setNewBatsmanId(v)} 
        />
      </Modal>
    </div>
  );
}
