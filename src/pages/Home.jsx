import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <h1>Welcome to FitTrack</h1>

        <p>
          Your personal fitness companion. Track workouts,
          monitor progress, and achieve your goals.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn">
            Get Started
          </Link>

          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </section>

      <section className="features">

        <div className="card">
          <h2>🏋️ Workout Tracking</h2>
          <p>
            Log exercises, sets, reps, and weights with ease.
          </p>
        </div>

        <div className="card">
          <h2>🎯 Goals</h2>
          <p>
            Set personal fitness goals and monitor your progress.
          </p>
        </div>

        <div className="card">
          <h2>📈 Progress</h2>
          <p>
            View your workout history and performance over time.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;