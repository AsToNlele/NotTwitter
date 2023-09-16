import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  comment: protectedProcedure
    .input(z.object({ tweetId: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet
        .findUnique({
          where: {
            id: input.tweetId,
          },
        })
        .then((tweet) => {
          if (!tweet) {
            throw new TRPCError({
              code: "NOT_FOUND",
            });
          }
          if (!tweet.authorId) {
            throw new TRPCError({
              code: "BAD_REQUEST",
            });
          }
          return ctx.prisma.tweet.create({
            data: {
              text: input.text,
              parentTweet: {
                connect: {
                  id: input.tweetId,
                },
              },
              author: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          });
        });
    }),
});
