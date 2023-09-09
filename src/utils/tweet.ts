import type { Like } from "@prisma/client";
import type { TweetWithAuthorAndLikes } from "prisma/customTypes";

const optimisticallyChangeLike = (
  oldTweet: TweetWithAuthorAndLikes
): TweetWithAuthorAndLikes => {
  if (oldTweet?.likes.length > 0) {
    const newLikes: Like[] = [];
    return {
      ...oldTweet,
      likes: newLikes,
      _count: { likes: oldTweet._count.likes - 1 },
    };
  } else {
    const newLikes: Like[] = [
      {
        id: "123",
        userId: "123",
        createdAt: new Date(),
        tweetId: "123",
      },
    ];
    return {
      ...oldTweet,
      likes: newLikes,
      _count: { likes: oldTweet._count.likes + 1 },
    };
  }
};

export { optimisticallyChangeLike };
