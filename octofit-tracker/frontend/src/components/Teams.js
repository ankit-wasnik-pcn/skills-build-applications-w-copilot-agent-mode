import React, { useEffect, useState } from 'react';

const TEAM_COLORS = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'];

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setTeams(data.results || data);
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
        <span style={{ fontSize: '2rem' }}>👥</span>
        <h1 className="mb-0">Teams</h1>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center py-3"
          style={{ background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)' }}>
          <span className="text-white fw-semibold fs-5">All Teams</span>
          {!loading && !error && (
            <span className="badge bg-light text-primary fs-6">{teams.length} teams</span>
          )}
        </div>
        <div className="card-body p-0">
          {loading && (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary me-3" role="status" />
              <span className="text-muted">Loading teams…</span>
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
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        No teams found.
                      </td>
                    </tr>
                  ) : (
                    teams.map((team, idx) => (
                      <tr key={team._id || team.id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td>
                          <span className={`badge bg-${TEAM_COLORS[idx % TEAM_COLORS.length]} me-2 fs-6 px-3 py-2`}>
                            {team.name}
                          </span>
                        </td>
                        <td className="text-muted">{team.description || '—'}</td>
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

export default Teams;
