import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = t.router({
  getAllPosts: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  createPost: authedProcedure
  .input(z.object({ description: z.string() }))
  .mutation(({ctx, input}) => {
    return ctx.prisma.post.create({
      data: {
        description: input.description,
        userId: ctx.session.user.id
      }
    });
  }),
});
