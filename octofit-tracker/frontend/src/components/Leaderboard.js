import React, { useEffect, useState } from 'react';

const RANK_MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };
const RANK_ROW_CLASS = { 1: 'table-warning', 2: 'table-secondary', 3: 'table-light' };

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        const sorted = [...results].sort((a, b) => a.rank - b.rank);
        setLeaders(sorted);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4 gap-2">
        <span style={{ fontSize: '2rem' }}>🏆</span>
        <h1 className="mb-0">Leaderboard</h1>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center py-3"
          style={{ background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)' }}>
          <span className="text-white fw-semibold fs-5">Rankings</span>
          {!loading && !error && (
            <span className="badge bg-light text-primary fs-6">{leaders.length} athletes</span>
          )}
        </div>
        <div className="card-body p-0">
          {loading && (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary me-3" role="status" />
              <span className="text-muted">Loading leaderboard…</span>
            </div>
          )}
          {error && (
            <div className="alert alert-danger m-3" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Athlete</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        No leaderboard data found.
                      </td>
                    </tr>
                  ) : (
                    leaders.map((leader, idx) => (
                      <tr key={leader._id || leader.id || idx}
                        className={RANK_ROW_CLASS[leader.rank] || ''}>
                        <td>
                          <span className="fw-bold fs-5 me-1">
                            {RANK_MEDAL[leader.rank] || `#${leader.rank}`}
                          </span>
                          <span className="text-muted small">#{leader.rank}</span>
                        </td>
                        <td className="fw-semibold">{leader.user}</td>
                        <td>
                          <span className="badge bg-primary fs-6 px-3 py-2">
                            {leader.score} pts
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
