import { Router } from "express";

import { environment } from "../../config/environment.js";
import { loginRequestSchema } from "./login.schema.js";

export const authenticationRouter = Router();

authenticationRouter.post("/login", (request, response) => {
  const parsedRequest = loginRequestSchema.safeParse(request.body);

  if (!parsedRequest.success) {
    response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "The login details are invalid.",
        details: parsedRequest.error.flatten().fieldErrors,
      },
    });

    return;
  }

  const { email, password } = parsedRequest.data;

  const credentialsAreValid =
    email === environment.DEV_LOGIN_EMAIL.toLowerCase() &&
    password === environment.DEV_LOGIN_PASSWORD;

  if (!credentialsAreValid) {
    response.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "The email address or password is incorrect.",
      },
    });

    return;
  }

  response.status(200).json({
    user: {
      id: "dev-user-001",
      email,
      firstName: "Chris",
      lastName: "van der Merwe",
      roles: ["administrator"],
    },
    message: "Login successful.",
  });
});