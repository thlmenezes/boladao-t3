// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@root/server/trpc/router";
import { createContext } from "@root/server/trpc/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
});
