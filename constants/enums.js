export const battingStyleOptions = [
  { value: 0, label: 'Right-Handed' },
  { value: 1, label: 'Left-Handed' },
];

export const bowlingStyleOptions = [
  { value: 0, label: 'Right-arm Fast' },
  { value: 1, label: 'Right-arm Fast-Medium' },
  { value: 2, label: 'Right-arm Medium' },
  { value: 3, label: 'Left-arm Fast' },
  { value: 4, label: 'Left-arm Fast-Medium' },
  { value: 5, label: 'Right-arm Off-break' },
  { value: 6, label: 'Right-arm Leg-break' },
  { value: 7, label: 'Left-arm Orthodox' },
  { value: 8, label: 'Left-arm Chinaman' },
];

export const playingRoleOptions = [
  { value: 'batsman', label: 'Batsman' },
  { value: 'bowler', label: 'Bowler' },
  { value: 'allrounder', label: 'All-Rounder' },
  { value: 'wicketkeeper', label: 'Wicket-Keeper Batsman' },
];

export const matchTypeOptions = [
  { value: 'tournament', label: 'Tournament' },
  { value: 'series', label: 'Series' },
  { value: 'friendly', label: 'Friendly' },
];

export const sportOptions = [
  { value: 1, label: 'Cricket' },
  { value: 2, label: 'Football' },
  { value: 3, label: 'Basketball' },
];

export const tournamentFormatOptions = [
  { value: 1, label: 'T20' },
  { value: 2, label: 'ODI' },
  { value: 3, label: 'Test' },
  { value: 4, label: 'Custom' },
];

export const tournamentTypeOptions = [
  { value: 1, label: 'Knockout' },
  { value: 2, label: 'League' },
];


export const tournamentStatusOptions = [
  { value: 0, label: 'Upcoming' },
  { value: 1, label: 'Ongoing' },
  { value: 2, label: 'Completed' },
];

export const matchStatusOptions = [
  { value: 1, label: 'Scheduled' },
  { value: 2, label: 'Live' },
  { value: 3, label: 'Completed' },
  { value: 4, label: 'Abandoned' },
];

export const tossDecisionOptions = [
  { value: 1, label: 'Bat' },
  { value: 2, label: 'Bowl' },
];

export const wicketTypeOptions = [
  { value: 1, label: 'Bowled' },
  { value: 2, label: 'Caught' },
  { value: 3, label: 'Run Out' },
  { value: 4, label: 'LBW' },
  { value: 5, label: 'Stumped' },
  { value: 6, label: 'Hit Wicket' },
  { value: 7, label: 'None' },
];

export const getBattingStyleLabel = (value) =>
  battingStyleOptions.find(o => o.value === value)?.label || '—';

export const getBowlingStyleLabel = (value) =>
  bowlingStyleOptions.find(o => o.value === value)?.label || '—';

export const getSportLabel = (value) =>
  sportOptions.find(o => o.value === value)?.label || '—';

export const getTournamentStatusLabel = (value) =>
  tournamentStatusOptions.find(o => o.value === value)?.label || '—';

export const getTournamentTypeLabel = (value) =>
  tournamentTypeOptions.find(o => o.value === value)?.label || '—';

export const getMatchStatusLabel = (value) =>
  matchStatusOptions.find(o => o.value === value)?.label || '—';

export const getTossDecisionLabel = (value) =>
  tossDecisionOptions.find(o => o.value === value)?.label || '—';

export const getWicketTypeLabel = (value) =>
  wicketTypeOptions.find(o => o.value === value)?.label || '—';

