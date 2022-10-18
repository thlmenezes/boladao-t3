import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { authedProcedure, t } from '@root/server/trpc/trpc';

export const postRouter = t.router({
  getAllPosts: authedProcedure
    .input(
      z.object({
        mine: z.boolean().default(false),
        tags: z.string().array().optional(),
        take: z.number().gte(0).optional(),
        skip: z.number().gte(0).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const filter =
        input.tags && input.tags.length > 0
          ? ({
              tags: {
                some: {
                  name: {
                    in: input.tags,
                  },
                },
              },
            } as Prisma.PostWhereInput)
          : undefined;

      const posts = await ctx.prisma.post.findMany({
        include: {
          user: true,
          tags: true,
        },
        where: {
          ...filter,
          visible: input.mine ? undefined : true,
          userId: input.mine ? ctx.session.user.id : undefined,
        },
        skip: input.skip,
        take: input.take,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return input.tags && input.tags.length > 0
        ? posts.filter((post) => post.tags.length >= (input.tags?.length ?? 0))
        : posts;
    }),
  createPost: authedProcedure
    .input(
      z.object({
        description: z.string(),
        tags: z.string().array(),
        visible: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          ...input,
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
        visible: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
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
