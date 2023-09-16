import { TRPCError } from "@trpc/server";
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
  getOneWithParents: protectedProcedure
    .input(z.object({ tweet: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweet: tweetId } = input;

      const findTweet = async (id: string | null) => {
        if (!id) {
          return null;
        }
        return prisma.tweet.findFirst({
          where: { id },
          include: {
            author: true,
            likes: { where: { userId: { equals: session.user.id } } },
            _count: { select: { likes: true, replies: true } },
          },
        });
      };

      const tweetStack = [];
      let currentTweet = await findTweet(tweetId);

      while (currentTweet) {
        tweetStack.push(currentTweet);
        currentTweet = await findTweet(currentTweet.parentTweetId);
      }

      if (tweetStack.length === 0) {
        return { tweet: null, parentTweets: [] };
      }

      return {
        tweet: tweetStack[0],
        parentTweets: tweetStack.slice(1).reverse(),
      };
    }),
  delete: protectedProcedure
    .input(z.object({ tweet: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.findUnique({
        where: { id: input.tweet },
      });
      if (!tweet) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (tweet.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.tweet.update({
        where: { id: input.tweet },
        data: {
          author: { disconnect: true },
          text: "",
          likes: { deleteMany: {} },
        },
      });
    }),
});
