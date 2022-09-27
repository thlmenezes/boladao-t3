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
  getMyPosts: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        userId: ctx.session.user.id,
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
  deletePost: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.delete({
        where: input,
      });
    }),
  editPost: authedProcedure
    .input(z.object({ id: z.string(), description: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
        },
      });
    }),
});
