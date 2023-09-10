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
          if (tweet) {
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
          }
        });
    }),
});
