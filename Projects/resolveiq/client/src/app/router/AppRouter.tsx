import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "../layouts/AppShell";
import { DashboardPage } from "../../pages/DashboardPage";
import { PlaceholderPage } from "../../pages/PlaceholderPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route
          path="/cases"
          element={
            <PlaceholderPage
              title="Cases"
              description="Incidents, service requests, changes, and problems will be managed here."
            />
          }
        />

        <Route
          path="/people"
          element={
            <PlaceholderPage
              title="People"
              description="Users, teams, departments, and permissions will be managed here."
            />
          }
        />

        <Route
          path="/assets"
          element={
            <PlaceholderPage
              title="Assets"
              description="Managed devices and asset history will appear here."
            />
          }
        />

        <Route
          path="/knowledge"
          element={
            <PlaceholderPage
              title="Knowledge"
              description="Support articles, runbooks, and known solutions will appear here."
            />
          }
        />

        <Route
          path="/reports"
          element={
            <PlaceholderPage
              title="Reports"
              description="Operational reporting and analytics will appear here."
            />
          }
        />

        <Route
          path="/administration"
          element={
            <PlaceholderPage
              title="Administration"
              description="System configuration and governance controls will appear here."
            />
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};