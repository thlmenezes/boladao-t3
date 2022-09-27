import { z } from 'zod';

import { authedProcedure, t } from '@root/server/trpc/trpc';

export const postRouter = t.router({
  getAllPosts: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        user: true,
      },
    });
  }),
  createPost: authedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),
});
