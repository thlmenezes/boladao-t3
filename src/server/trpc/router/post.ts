import { t, authedProcedure } from "../trpc";

export const postRouter = t.router({
  getAllPosts: authedProcedure.query(({ctx}) => {
    return ctx.prisma.post.findMany();
  }),
});
