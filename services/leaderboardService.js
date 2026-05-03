import api from './api';

export const leaderboardService = {
  getMostRuns: (tournamentId) => api.get('/leaderboard/most-runs', { params: { tournamentId } }),
  getMostWickets: (tournamentId) => api.get('/leaderboard/most-wickets', { params: { tournamentId } }),
  getMostSixes: (tournamentId) => api.get('/leaderboard/most-sixes', { params: { tournamentId } }),
  getMostFours: (tournamentId) => api.get('/leaderboard/most-fours', { params: { tournamentId } }),
};
