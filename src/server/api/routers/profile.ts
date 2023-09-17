import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ handle: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: { handle: input.handle },
      });
    }),
});
