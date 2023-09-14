import type { Like } from "@prisma/client";
import type { TweetWithAuthorAndLikes } from "prisma/customTypes";

const optimisticallyChangeLike = (oldTweet: TweetWithAuthorAndLikes) => {
  if (!oldTweet) return oldTweet;
  if (oldTweet?.likes.length > 0) {
    const newLikes: Like[] = [];
    return {
      ...oldTweet,
      likes: newLikes,
      _count: {
        likes: oldTweet._count.likes - 1,
        replies: oldTweet._count.replies,
      },
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
      _count: {
        likes: oldTweet._count.likes + 1,
        replies: oldTweet._count.replies,
      },
    };
  }
};

export { optimisticallyChangeLike };
