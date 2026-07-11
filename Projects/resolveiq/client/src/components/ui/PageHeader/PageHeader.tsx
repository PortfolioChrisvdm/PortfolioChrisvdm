import type { ReactNode } from "react";

import "./PageHeader.css";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) => {
  return (
    <header className="page-header">
      <div className="page-header__content">
        {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}

        <h1 className="page-header__title">{title}</h1>

        {description && (
          <p className="page-header__description">{description}</p>
        )}
      </div>

      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
  );
};