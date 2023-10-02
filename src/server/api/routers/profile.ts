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
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        handle: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          handle: input.handle,
          description: input.description,
        },
      });
    }),
});
