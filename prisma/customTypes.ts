import { Prisma } from "@prisma/client";

const tweetWithAuthor = Prisma.validator<Prisma.TweetArgs>()({
  include: { author: true },
});

const tweetWithAuthorAndLikes = Prisma.validator<Prisma.TweetArgs>()({
  include: { author: true, likes: true, _count: { select: { likes: true } } },
});

export type TweetWithAuthor = Prisma.TweetGetPayload<typeof tweetWithAuthor>;
export type TweetWithAuthorAndLikes = Prisma.TweetGetPayload<
  typeof tweetWithAuthorAndLikes
>;
