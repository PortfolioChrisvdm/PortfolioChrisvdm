import { useEffect, useState } from "react";

import "./App.css";

interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadApiHealth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/health",
        );

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data: HealthResponse = await response.json();
        setHealth(data);
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : "Unable to contact the API.";

        setError(message);
      }
    };

    void loadApiHealth();
  }, []);

  return (
    <main className="dashboard">
      <section className="status-card">
        <p className="eyebrow">ResolveIQ Platform Foundation</p>

        <h1>System Status</h1>

        {!health && !error && (
          <p className="loading-message">Checking API status...</p>
        )}

        {error && (
          <div className="status status-offline">
            <span className="status-indicator" />
            <div>
              <strong>API Offline</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {health && (
          <>
            <div className="status status-online">
              <span className="status-indicator" />
              <div>
                <strong>API Online</strong>
                <p>The ResolveIQ backend is responding normally.</p>
              </div>
            </div>

            <dl className="system-details">
              <div>
                <dt>Service</dt>
                <dd>{health.service}</dd>
              </div>

              <div>
                <dt>Version</dt>
                <dd>{health.version}</dd>
              </div>

              <div>
                <dt>Status</dt>
                <dd>{health.status}</dd>
              </div>

              <div>
                <dt>Last response</dt>
                <dd>{new Date(health.timestamp).toLocaleString()}</dd>
              </div>
            </dl>
          </>
        )}
      </section>
    </main>
  );
}

export default App;