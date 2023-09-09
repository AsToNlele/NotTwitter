import type { TweetWithAuthorAndLikes } from "prisma/customTypes";
import { api } from "~/utils/api";
import { optimisticallyChangeLike } from "~/utils/tweet";

const useLikeTweet = () => {
  const utils = api.useContext();
  const likeOrUnlikeTweet = api.like.like.useMutation({
    onMutate: async (value) => {
      // Optimistically like/unlike tweet
      await utils.tweet.getAll.cancel();
      utils.tweet.getAll.setData(undefined, (oldTweets) => {
        if (!oldTweets) return undefined;
        const newTweets = oldTweets.map((tweet) => {
          if (tweet.id === value?.tweetId) {
            return optimisticallyChangeLike(tweet);
          } else {
            return tweet;
          }
        });
        return newTweets;
      });
      await utils.tweet.getOne.cancel({ tweet: value?.tweetId });
      utils.tweet.getOne.setData(
        { tweet: value?.tweetId },
        (oldTweet): TweetWithAuthorAndLikes | undefined => {
          if (!oldTweet) return undefined;
          return optimisticallyChangeLike(oldTweet);
        }
      );
    },
    onSettled: (value) => {
      utils.tweet.getAll.invalidate();
      utils.tweet.getOne.invalidate({ tweet: value?.tweetId });
    },
  });

  return likeOrUnlikeTweet;
};

export { useLikeTweet };
