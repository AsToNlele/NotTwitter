import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { optimisticallyChangeLike } from "~/utils/tweet";

const useLikeTweet = () => {
  const utils = api.useContext();
  const router = useRouter();
  const { tweet, user } = router.query;
  const tweetId = Array.isArray(tweet) ? tweet[0] : tweet;
  const userHandle = Array.isArray(user) ? user[0] : user;

  const likeOrUnlikeTweet = api.like.like.useMutation({
    onMutate: async (value) => {
      // Optimistically like/unlike tweet
      await utils.tweet.getAll.cancel();
      utils.tweet.getAll.setData(
        undefined,
        (oldTweets) =>
          oldTweets?.map((tweet) =>
            tweet.id === value?.tweetId
              ? optimisticallyChangeLike(tweet)
              : tweet,
          ),
      );
      await utils.tweet.getOne.cancel({ tweet: value?.tweetId });
      utils.tweet.getOne.setData({ tweet: value?.tweetId }, (oldTweet) =>
        oldTweet ? optimisticallyChangeLike(oldTweet) : oldTweet,
      );

      if (tweetId) {
        // Optimistically update comments
        await utils.tweet.getComments.cancel({ tweet: tweetId });
        utils.tweet.getComments.setData(
          { tweet: tweetId },
          (oldComments) =>
            oldComments?.map((comment) =>
              comment.id === value?.tweetId
                ? optimisticallyChangeLike(comment)
                : comment,
            ),
        );

        // Optimistically update single tweet and parent tweets
        utils.tweet.getOneWithParents.setData({ tweet: tweetId }, (oldData) =>
          oldData && oldData.tweet
            ? oldData.tweet.id === value?.tweetId
              ? // Main tweet
                {
                  tweet: optimisticallyChangeLike(oldData.tweet),
                  parentTweets: oldData.parentTweets,
                }
              : // Parent tweets
                {
                  tweet: oldData.tweet,
                  parentTweets: oldData.parentTweets.map((parentTweet) =>
                    parentTweet.id === value?.tweetId
                      ? optimisticallyChangeLike(parentTweet)
                      : parentTweet,
                  ),
                }
            : oldData,
        );
      }

      if (userHandle) {
        await utils.tweet.getProfileLikes.cancel();
        utils.tweet.getProfileLikes.setData(
          { handle: userHandle },
          (oldTweets) =>
            oldTweets?.map((tweet) =>
              tweet.id === value?.tweetId
                ? optimisticallyChangeLike(tweet)
                : tweet,
            ),
        );
      }
    },
    onSettled: (value) => {
      void utils.tweet.getAll.invalidate();
      void utils.tweet.getOne.invalidate({ tweet: value?.tweetId });
      void utils.tweet.getComments.invalidate({ tweet: tweetId });
      void utils.tweet.getOneWithParents.invalidate({ tweet: tweetId });
      void utils.tweet.getProfileTweets.invalidate();
      void utils.tweet.getProfileReplies.invalidate();
      void utils.tweet.getProfileLikes.invalidate();
    },
  });

  return likeOrUnlikeTweet;
};

export { useLikeTweet };
