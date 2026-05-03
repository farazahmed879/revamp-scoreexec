'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useApi } from '@/hooks/useApi';
import { matchesService } from '@/services/matchesService';
import { teamsService } from '@/services/teamsService';
import { tossDecisionOptions } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import styles from './create.module.css';

export default function CreateMatchPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    ground: '',
    team1Id: '',
    team2Id: '',
    totalOvers: '20',
    scheduledAt: new Date().toISOString().slice(0, 16),
    team1Squad: [],
    team2Squad: [],
    tossWinnerId: '',
    tossDecision: 1,
    openingBowlerId: '',
    mode: 'online', // 'online' or 'offline'
  });

  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);

  // Fetch teams for step 1
  const { data: teams } = useApi(useCallback(() => teamsService.getAll(), []));
  const teamOptions = (teams || []).map((t) => ({ value: t.id, label: t.name }));

  // Fetch players when teams are selected
  useEffect(() => {
    async function fetchPlayers() {
      if (step === 2 && formData.team1Id && formData.team2Id) {
        setLoadingPlayers(true);
        try {
          const [res1, res2] = await Promise.all([
            teamsService.getPlayers(formData.team1Id),
            teamsService.getPlayers(formData.team2Id),
          ]);
          setTeam1Players(res1.data);
          setTeam2Players(res2.data);
        } catch (err) {
          showToast('Failed to load team rosters', 'error');
        } finally {
          setLoadingPlayers(false);
        }
      }
    }
    fetchPlayers();
  }, [step, formData.team1Id, formData.team2Id, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePlayer = (teamNum, playerId) => {
    const field = teamNum === 1 ? 'team1Squad' : 'team2Squad';
    setFormData((prev) => {
      const squad = prev[field];
      if (squad.includes(playerId)) {
        return { ...prev, [field]: squad.filter((id) => id !== playerId) };
      } else {
        return { ...prev, [field]: [...squad, playerId] };
      }
    });
  };

  const validateStep1 = () => {
    if (!formData.ground || !formData.team1Id || !formData.team2Id) {
      showToast('Please fill all required fields', 'error');
      return false;
    }
    if (formData.team1Id === formData.team2Id) {
      showToast('Teams must be different', 'error');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2) setStep(3);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Create Match
      const matchRes = await matchesService.create({
        homeTeamId: formData.team1Id,
        awayTeamId: formData.team2Id,
        scheduledAt: formData.scheduledAt,
        venue: formData.ground,
        totalOvers: parseInt(formData.totalOvers),
      });

      const matchId = matchRes.data.id;

      // 2. Start Match (sets toss and creates innings/over)
      await matchesService.startMatch(matchId, {
        tossWinnerId: formData.tossWinnerId,
        tossDecision: parseInt(formData.tossDecision),
        openingBowlerId: formData.openingBowlerId,
      });

      showToast('Match created and started!', 'success');
      router.push(`/matches/${matchId}/scoring`);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to start match', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const team1Name = teams?.find((t) => t.id === formData.team1Id)?.name || 'Team 1';
  const team2Name = teams?.find((t) => t.id === formData.team2Id)?.name || 'Team 2';

  const bowlingTeamId = formData.tossWinnerId === formData.team1Id 
    ? (formData.tossDecision == 1 ? formData.team2Id : formData.team1Id)
    : (formData.tossDecision == 1 ? formData.team1Id : formData.team2Id);
  
  const bowlingPlayers = bowlingTeamId === formData.team1Id ? team1Players : team2Players;

  return (
    <>
      <PageHeader title="Create Live Match" description="Follow the wizard to set up and start a match." />

      <div className={styles.stepper}>
        {[1, 2, 3].map((s) => (
          <div key={s} className={`${styles.step} ${step >= s ? styles.stepActive : ''}`}>
            <span className={styles.stepNum}>{s}</span>
            <span className={styles.stepLabel}>
              {s === 1 ? 'Setup' : s === 2 ? 'Squads' : 'Start'}
            </span>
            {s < 3 && <div className={styles.stepLine} />}
          </div>
        ))}
      </div>

      <Card hover={false} className={styles.wizardCard}>
        <CardBody>
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className={styles.stepTitle}>Match Details</h3>
              <div className={styles.formGrid}>
                <Input label="Venue / Ground" name="ground" value={formData.ground} onChange={handleChange} required />
                <Input label="Scheduled Time" name="scheduledAt" type="datetime-local" value={formData.scheduledAt} onChange={handleChange} />
                <Select label="Home Team" name="team1Id" options={teamOptions} value={formData.team1Id} onChange={handleSelectChange} required />
                <Select label="Away Team" name="team2Id" options={teamOptions} value={formData.team2Id} onChange={handleSelectChange} required />
                <Input label="Total Overs" name="totalOvers" type="number" value={formData.totalOvers} onChange={handleChange} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className={styles.stepTitle}>Select Playing XI</h3>
              {loadingPlayers ? (
                <p>Loading team rosters...</p>
              ) : (
                <div className={styles.squadGrid}>
                  <div className={styles.squadCol}>
                    <h4>{team1Name}</h4>
                    <div className={styles.playerList}>
                      {team1Players.map((p) => (
                        <div
                          key={p.id}
                          className={`${styles.playerItem} ${formData.team1Squad.includes(p.id) ? styles.selected : ''}`}
                          onClick={() => togglePlayer(1, p.id)}
                        >
                          <span>{p.fullName}</span>
                          {formData.team1Squad.includes(p.id) && <Badge variant="success">XI</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.squadCol}>
                    <h4>{team2Name}</h4>
                    <div className={styles.playerList}>
                      {team2Players.map((p) => (
                        <div
                          key={p.id}
                          className={`${styles.playerItem} ${formData.team2Squad.includes(p.id) ? styles.selected : ''}`}
                          onClick={() => togglePlayer(2, p.id)}
                        >
                          <span>{p.fullName}</span>
                          {formData.team2Squad.includes(p.id) && <Badge variant="success">XI</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className={styles.stepTitle}>Toss & Opening</h3>
              <div className={styles.formGrid}>
                <Select
                  label="Toss Winner"
                  name="tossWinnerId"
                  options={[
                    { value: formData.team1Id, label: team1Name },
                    { value: formData.team2Id, label: team2Name },
                  ]}
                  value={formData.tossWinnerId}
                  onChange={handleSelectChange}
                  required
                />
                <Select
                  label="Toss Decision"
                  name="tossDecision"
                  options={tossDecisionOptions}
                  value={formData.tossDecision}
                  onChange={handleSelectChange}
                  required
                />
                <Select
                  label="Opening Bowler"
                  name="openingBowlerId"
                  options={bowlingPlayers.map((p) => ({ value: p.id, label: p.fullName }))}
                  value={formData.openingBowlerId}
                  onChange={handleSelectChange}
                  required
                />
                <Select
                  label="Scoring Mode"
                  name="mode"
                  options={[
                    { value: 'online', label: 'Online (Cloud Sync)' },
                    { value: 'offline', label: 'Offline (Local Only)' },
                  ]}
                  value={formData.mode}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
          )}

          <div className={styles.wizardActions}>
            {step > 1 && <Button variant="secondary" onClick={prevStep}>Back</Button>}
            {step < 3 ? (
              <Button variant="primary" onClick={nextStep}>Continue</Button>
            ) : (
              <Button variant="success" onClick={handleSubmit} loading={submitting}>
                Start Match
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
