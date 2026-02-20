
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const NAV_LINKS = [
  { to: '/activities', label: 'Activities', icon: '🏃' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { to: '/teams', label: 'Teams', icon: '👥' },
  { to: '/users', label: 'Users', icon: '👤' },
  { to: '/workouts', label: 'Workouts', icon: '💪' },
];

const FEATURE_CARDS = [
  {
    icon: '🏃',
    title: 'Activity Logging',
    desc: 'Track every run, cycle, swim and more. Log duration, calories, and dates.',
    link: '/activities',
    color: 'success',
  },
  {
    icon: '🏆',
    title: 'Leaderboard',
    desc: 'See where you stand. Compete with teammates and climb the rankings.',
    link: '/leaderboard',
    color: 'warning',
  },
  {
    icon: '👥',
    title: 'Teams',
    desc: 'Join or create a team. Train together and dominate the competition.',
    link: '/teams',
    color: 'primary',
  },
  {
    icon: '👤',
    title: 'User Profiles',
    desc: 'Manage athlete profiles. Track active members across all teams.',
    link: '/users',
    color: 'info',
  },
  {
    icon: '💪',
    title: 'Workout Plans',
    desc: 'Explore personalized workout plans rated by difficulty level.',
    link: '/workouts',
    color: 'danger',
  },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center py-5 mb-4 hero-section rounded-4">
        <img src="/octofitapp-small.png" alt="Octofit Logo" style={{ height: 90, marginBottom: 16 }} />
        <h1 className="display-2 fw-bold mb-3">Welcome to Octofit Tracker!</h1>
        <p className="lead text-muted mb-4" style={{ fontSize: '1.3rem' }}>
          Track your fitness, join teams, and compete on the leaderboard.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Link to="/activities" className="btn btn-primary btn-lg px-4">
            🏃 Get Started
          </Link>
          <Link to="/leaderboard" className="btn btn-outline-primary btn-lg px-4">
            🏆 View Leaderboard
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="row g-4 mt-2">
        {FEATURE_CARDS.map((card) => (
          <div className="col-12 col-sm-6 col-lg-4" key={card.title}>
            <div className="card h-100 shadow-sm feature-card">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3 gap-2">
                  <span style={{ fontSize: '2rem' }}>{card.icon}</span>
                  <h5 className="card-title mb-0">{card.title}</h5>
                </div>
                <p className="card-text text-muted flex-grow-1">{card.desc}</p>
                <Link to={card.link} className={`btn btn-${card.color} btn-sm mt-3 align-self-start`}>
                  View {card.title} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm mb-4">
        <div className="container-fluid">
          <div className="octofit-logo-left">
            <img src="/octofitapp-small.png" alt="Octofit Tracker Logo" className="App-logo me-2" />
            <Link className="navbar-brand fw-bold fs-3" to="/">Octofit Tracker</Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <li className="nav-item" key={to}>
                  <Link className="nav-link" to={to}>
                    <span className="me-1">{icon}</span>
                    <span className="fw-semibold">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
