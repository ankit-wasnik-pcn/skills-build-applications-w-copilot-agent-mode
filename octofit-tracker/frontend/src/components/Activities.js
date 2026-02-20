import React, { useEffect, useState } from 'react';

const ACTIVITY_TYPE_COLORS = {
  Running: 'success',
  Cycling: 'primary',
  Swimming: 'info',
  Flying: 'secondary',
  Hiking: 'warning',
  Yoga: 'danger',
};

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setActivities(data.results || data);
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
        <span style={{ fontSize: '2rem' }}>🏃</span>
        <h1 className="mb-0">Activities</h1>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center py-3"
          style={{ background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)' }}>
          <span className="text-white fw-semibold fs-5">Activity Log</span>
          {!loading && !error && (
            <span className="badge bg-light text-primary fs-6">{activities.length} entries</span>
          )}
        </div>
        <div className="card-body p-0">
          {loading && (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary me-3" role="status" />
              <span className="text-muted">Loading activities…</span>
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
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration (min)</th>
                    <th scope="col">Calories Burned</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No activities found.
                      </td>
                    </tr>
                  ) : (
                    activities.map((activity, idx) => (
                      <tr key={activity._id || activity.id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td className="fw-semibold">{activity.user}</td>
                        <td>
                          <span className={`badge bg-${ACTIVITY_TYPE_COLORS[activity.activity_type] || 'secondary'}`}>
                            {activity.activity_type}
                          </span>
                        </td>
                        <td>{activity.duration} min</td>
                        <td>
                          <span className="text-danger fw-semibold">🔥 {activity.calories_burned}</span>
                        </td>
                        <td>{activity.date}</td>
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

export default Activities;
