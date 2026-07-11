import { ApiStatus } from "../components/ApiStatus";

export const DashboardPage = () => {
  return (
    <section className="page-section" aria-labelledby="dashboard-title">
      <p className="page-eyebrow">Platform foundation</p>
      <h1 id="dashboard-title">Dashboard</h1>

      <p className="page-description">
        Monitor the current ResolveIQ development environment.
      </p>

      <ApiStatus />
    </section>
  );
};