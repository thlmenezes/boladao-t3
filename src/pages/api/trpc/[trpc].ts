// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';

import { createContext } from '@root/server/trpc/context';
import { appRouter } from '@root/server/trpc/router';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
});
