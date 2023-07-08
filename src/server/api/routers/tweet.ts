import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.tweet.findMany({ include: { author: true } });
  }),
});
