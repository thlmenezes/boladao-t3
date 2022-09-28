import { z } from 'zod';

import { authedProcedure, t } from '@root/server/trpc/trpc';

export const postRouter = t.router({
  getAllPosts: authedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        tags: z.string().array().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const filter =
        input.tags && input.tags.length > 0
          ? {
              tags: {
                some: {
                  name: {
                    in: input.tags,
                  },
                },
              },
            }
          : undefined;

      return ctx.prisma.post.findMany({
        include: {
          user: true,
          tags: true,
        },
        where: {
          userId: input.userId ?? undefined,
          ...filter,
        },
      });
    }),
  getMyPosts: authedProcedure
    .input(z.object({ tags: z.string().array().optional() }))
    .query(({ ctx, input }) => {
      const filter =
        input.tags && input.tags.length > 0
          ? {
              tags: {
                some: {
                  name: {
                    in: input.tags,
                  },
                },
              },
            }
          : {};

      return ctx.prisma.post.findMany({
        where: {
          userId: ctx.session.user.id,
          ...filter,
        },
        include: {
          tags: true,
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
