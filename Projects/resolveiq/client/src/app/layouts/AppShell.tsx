import {
  BookOpen,
  Boxes,
  ChartNoAxesCombined,
  CircleGauge,
  FolderKanban,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import "./AppShell.css";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: CircleGauge,
  },
  {
    label: "Cases",
    path: "/cases",
    icon: FolderKanban,
  },
  {
    label: "People",
    path: "/people",
    icon: Users,
  },
  {
    label: "Assets",
    path: "/assets",
    icon: Boxes,
  },
  {
    label: "Knowledge",
    path: "/knowledge",
    icon: BookOpen,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Administration",
    path: "/administration",
    icon: Settings,
  },
];

export const AppShell = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            R
          </span>

          <div>
            <strong>ResolveIQ</strong>
            <span>IT operations</span>
          </div>
        </div>

        <nav className="primary-navigation" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <label className="search-control">
            <Search aria-hidden="true" />
            <span className="visually-hidden">Search ResolveIQ</span>
            <input
              type="search"
              placeholder="Search cases, people, and assets"
            />
          </label>

          <button className="user-menu" type="button">
            <span className="user-avatar" aria-hidden="true">
              CV
            </span>

            <span>
              <strong>Chris van der Merwe</strong>
              <small>Administrator</small>
            </span>
          </button>
        </header>

        <main className="main-content">
          <Outlet />
        </main>

        <footer className="statusbar">
          <span>
            <span className="connection-dot" aria-hidden="true" />
            API connected
          </span>

          <span>ResolveIQ 0.1.0</span>
          <span>Development</span>
        </footer>
      </div>
    </div>
  );
};