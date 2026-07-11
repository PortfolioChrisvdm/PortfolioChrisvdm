import { Plus } from "lucide-react";

import { ApiStatus } from "../components/ApiStatus";
import { Button } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";

export const DashboardPage = () => {
  return (
    <section className="page-section" aria-labelledby="dashboard-title">
      <PageHeader
        eyebrow="Platform foundation"
        title="Dashboard"
        description="Monitor the current ResolveIQ development environment."
        actions={
          <Button icon={<Plus />}>
            Create case
          </Button>
        }
      />

      <ApiStatus />
    </section>
  );
};