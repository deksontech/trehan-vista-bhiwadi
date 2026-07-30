import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type D1Binding = Parameters<typeof drizzle>[0];

export function getDb(database?: D1Binding) {
  if (!database) {
    throw new Error(
      "A D1 database binding was not provided. This landing page does not require a database unless you add one explicitly."
    );
  }

  return drizzle(database, { schema });
}
