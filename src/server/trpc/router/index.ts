// src/server/trpc/router/index.ts
import { t } from "@root/server/trpc/trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { postRouter } from "./post";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
