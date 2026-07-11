import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import "./Button.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  loading = false,
  icon,
  className = "",
  disabled,
  type = "button",
  ...buttonProps
}: ButtonProps) => {
  const classes = [
    "button",
    `button--${variant}`,
    loading ? "button--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && (
        <span
          className="button__spinner"
          aria-hidden="true"
        />
      )}

      {!loading && icon && (
        <span className="button__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      <span>{loading ? "Please wait…" : children}</span>
    </button>
  );
};