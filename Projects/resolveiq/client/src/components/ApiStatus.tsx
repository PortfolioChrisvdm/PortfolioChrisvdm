import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

export const ApiStatus = () => {
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
        setError(null);
      } catch (requestError) {
        setHealth(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to contact the API.",
        );
      }
    };

    void loadApiHealth();
  }, []);

  if (!health && !error) {
    return (
      <article className="status-panel" aria-live="polite">
        <p>Checking API status…</p>
      </article>
    );
  }

  if (error) {
    return (
      <article className="status-panel status-panel--error" aria-live="polite">
        <CircleX aria-hidden="true" />
        <div>
          <h2>API unavailable</h2>
          <p>{error}</p>
        </div>
      </article>
    );
  }

    if (!health) {
    return null;
  }

  return (
    <article className="status-panel status-panel--success" aria-live="polite">
      <CircleCheck aria-hidden="true" />

      <div>
        <h2>API online</h2>
        <p>The ResolveIQ backend is responding normally.</p>

        <dl className="status-details">
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
      </div>
    </article>
  );
};