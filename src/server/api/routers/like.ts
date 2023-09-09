import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
  like: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.like
        .findUnique({
          where: {
            userIdTweetId: {
              userId: ctx.session.user.id,
              tweetId: input.tweetId,
            },
          },
        })
        .then((like) => {
          if (like) {
            return ctx.prisma.like.delete({
              where: {
                userIdTweetId: {
                  userId: ctx.session.user.id,
                  tweetId: input.tweetId,
                },
              },
            });
          } else {
            return ctx.prisma.like.create({
              data: {
                tweet: {
                  connect: {
                    id: input.tweetId,
                  },
                },
                user: {
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
