import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setUsers(data.results || data);
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
        <span style={{ fontSize: '2rem' }}>👤</span>
        <h1 className="mb-0">Users</h1>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center py-3"
          style={{ background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)' }}>
          <span className="text-white fw-semibold fs-5">Registered Athletes</span>
          {!loading && !error && (
            <span className="badge bg-light text-primary fs-6">{users.length} users</span>
          )}
        </div>
        <div className="card-body p-0">
          {loading && (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary me-3" role="status" />
              <span className="text-muted">Loading users…</span>
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
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Team</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={user._id || user.id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td className="fw-semibold">{user.name}</td>
                        <td>
                          <a href={`mailto:${user.email}`} className="text-decoration-none">
                            {user.email}
                          </a>
                        </td>
                        <td>
                          <span className="badge bg-primary px-3 py-2">{user.team}</span>
                        </td>
                        <td>
                          {user.is_active
                            ? <span className="badge bg-success">Active</span>
                            : <span className="badge bg-secondary">Inactive</span>
                          }
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

export default Users;
