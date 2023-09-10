import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.tweet.findMany({
      // Exclude replies
      where: { parentTweetId: null },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        // Check if the current user has liked the tweet
        likes: { where: { userId: { equals: ctx.session.user.id } } },
        // Like count
        _count: { select: { likes: true, replies: true } },
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet.create({
        data: {
          text: input.text,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ tweet: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tweet.findFirst({
        where: { id: input.tweet },
        include: {
          author: true,
          // Check if the current user has liked the tweet
          likes: { where: { userId: { equals: ctx.session.user.id } } },
          // Like count
          _count: { select: { likes: true, replies: true } },
        },
      });
    }),
  getComments: protectedProcedure
    .input(z.object({ tweet: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tweet.findMany({
        where: { parentTweetId: input.tweet },
        include: {
          author: true,
          // Check if the current user has liked the tweet
          likes: { where: { userId: { equals: ctx.session.user.id } } },
          // Like count
          _count: { select: { likes: true, replies: true } },
        },
      });
    }),
});
