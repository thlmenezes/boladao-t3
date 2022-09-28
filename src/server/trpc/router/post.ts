import { z } from 'zod';

import { authedProcedure, t } from '@root/server/trpc/trpc';

export const postRouter = t.router({
  getAllPosts: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        user: true,
        tags: true,
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
    .input(z.object({ description: z.string(), tags: z.string().array() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
          tags: {
            connectOrCreate: input.tags.map((name) => ({
              create: {
                name,
              },
              where: {
                name,
              },
            })),
          },
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
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
        tags: z.string().array(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
          tags: {
            set: [],
            connectOrCreate: input.tags.map((name) => ({
              create: {
                name,
              },
              where: {
                name,
              },
            })),
          },
        },
      });
    }),
});
