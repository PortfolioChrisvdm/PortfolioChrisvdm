import { ApiStatus } from "../components/ApiStatus";
import { PageHeader } from "../components/ui/PageHeader";

export const DashboardPage = () => {
  return (
    <section className="page-section" aria-labelledby="dashboard-title">
      <PageHeader
        eyebrow="Platform foundation"
        title="Dashboard"
        description="Monitor the current ResolveIQ development environment."
      />

      <ApiStatus />
    </section>
  );
};