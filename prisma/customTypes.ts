import { Prisma } from "@prisma/client";

const tweetWithAuthor = Prisma.validator<Prisma.TweetArgs>()({
  include: { author: true },
});

export type TweetWithAuthor = Prisma.TweetGetPayload<typeof tweetWithAuthor>;
