import type { ComponentPropsWithoutRef, ReactNode } from "react";

import "./Card.css";

interface CardProps extends ComponentPropsWithoutRef<"article"> {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Card = ({
  children,
  title,
  description,
  className = "",
  ...articleProps
}: CardProps) => {
  const classes = ["card", className].filter(Boolean).join(" ");

  return (
    <article className={classes} {...articleProps}>
      {(title || description) && (
        <header className="card__header">
          {title && <h2 className="card__title">{title}</h2>}
          {description && (
            <p className="card__description">{description}</p>
          )}
        </header>
      )}

      <div className="card__content">{children}</div>
    </article>
  );
};