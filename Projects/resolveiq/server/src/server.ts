import "dotenv/config";

import { createApp } from "./app.js";
import { environment } from "./config/environment.js";

const app = createApp();

app.listen(environment.PORT, () => {
  console.log(
    `ResolveIQ API running at http://localhost:${environment.PORT}`,
  );
});