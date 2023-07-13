import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        // Check if the current user has liked the tweet
        likes: { where: { userId: { equals: ctx.session.user.id } } },
        // Like count
        _count: { select: { likes: true } },
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
});
