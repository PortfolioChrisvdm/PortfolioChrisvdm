import { LockKeyhole } from "lucide-react";
import {
  type FormEvent,
  useState,
} from "react";

import { Button } from "../../../components/ui/Button";
import "./LoginPage.css";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
  message: string;
}

interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
    details?: Record<string, string[]>;
  };
}

export const LoginPage = () => {
  const [email, setEmail] = useState(
    "admin@resolveiq.local",
  );
  const [password, setPassword] = useState(
    "ResolveIQ2026!",
  );
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);
  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const responseData = (await response.json()) as
        | LoginResponse
        | ApiErrorResponse;

      if (!response.ok) {
        const apiError = responseData as ApiErrorResponse;

        throw new Error(
          apiError.error?.message ??
            "Login failed. Try again.",
        );
      }

      const loginData = responseData as LoginResponse;

      setSuccessMessage(
        `Welcome, ${loginData.user.firstName}. ${loginData.message}`,
      );
    } catch (requestError) {
      setErrorMessage(
        requestError instanceof Error
          ? requestError.message
          : "ResolveIQ could not complete the login request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section
        className="login-panel"
        aria-labelledby="login-title"
      >
        <div className="login-brand">
          <span className="login-brand__mark" aria-hidden="true">
            R
          </span>

          <div>
            <strong>ResolveIQ</strong>
            <span>IT operations workspace</span>
          </div>
        </div>

        <div className="login-heading">
          <p>Secure access</p>
          <h1 id="login-title">Sign in to ResolveIQ</h1>
          <span>
            Enter your organisation credentials to continue.
          </span>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-field">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              aria-describedby="email-help"
            />

            <p id="email-help">
              Use the email address assigned to your
              ResolveIQ account.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength={8}
            />
          </div>

          {errorMessage && (
            <div
              className="login-message login-message--error"
              role="alert"
            >
              <strong>Unable to sign in</strong>
              <p>{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div
              className="login-message login-message--success"
              role="status"
            >
              <strong>Login successful</strong>
              <p>{successMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
            icon={<LockKeyhole />}
            className="login-submit"
          >
            Sign in
          </Button>
        </form>

        <p className="login-development-note">
          Temporary development authentication is active.
          Database-backed accounts will replace these credentials.
        </p>
      </section>
    </main>
  );
};