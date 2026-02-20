import React, { useEffect, useState } from 'react';

const DIFFICULTY_COLOR = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const DIFFICULTY_ICON = {
  Easy: '🟢',
  Medium: '🟡',
  Hard: '🔴',
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setWorkouts(data.results || data);
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
        <span style={{ fontSize: '2rem' }}>💪</span>
        <h1 className="mb-0">Workouts</h1>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center py-3"
          style={{ background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)' }}>
          <span className="text-white fw-semibold fs-5">Workout Plans</span>
          {!loading && !error && (
            <span className="badge bg-light text-primary fs-6">{workouts.length} workouts</span>
          )}
        </div>
        <div className="card-body p-0">
          {loading && (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary me-3" role="status" />
              <span className="text-muted">Loading workouts…</span>
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
                    <th scope="col">Workout Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No workouts found.
                      </td>
                    </tr>
                  ) : (
                    workouts.map((workout, idx) => (
                      <tr key={workout._id || workout.id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td className="fw-semibold">{workout.name}</td>
                        <td className="text-muted">{workout.description || '—'}</td>
                        <td>
                          <span className={`badge bg-${DIFFICULTY_COLOR[workout.difficulty] || 'secondary'} px-3 py-2`}>
                            {DIFFICULTY_ICON[workout.difficulty] || ''} {workout.difficulty}
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

export default Workouts;
