// src/server/trpc/router/index.ts
import { t } from '@root/server/trpc/trpc';

import { authRouter } from './auth';
import { exampleRouter } from './example';
import { postRouter } from './post';

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
