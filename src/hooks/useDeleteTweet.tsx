import { useRouter } from "next/router";
import { api } from "~/utils/api";

const useDeleteTweet = () => {
  const router = useRouter();
  const { tweet } = router.query;
  const tweetId = Array.isArray(tweet) ? tweet[0] : tweet;
  const utils = api.useContext();
  const deleteTweet = api.tweet.delete.useMutation({
    onMutate: async (value) => {
      await utils.tweet.getAll.cancel();
      utils.tweet.getAll.setData(
        undefined,
        (oldTweets) =>
          oldTweets?.filter((tweet) => tweet.id !== value?.tweet) || [],
      );

      if (tweetId) {
        await utils.tweet.getComments.cancel({ tweet: tweetId });
        utils.tweet.getComments.setData(
          { tweet: tweetId },
          (oldComments) =>
            oldComments?.filter((comment) => comment.id !== value?.tweet) || [],
        );
      }
    },
    onSettled: async (value) => {
      if (tweetId && tweet === value?.id) {
        await router.push("/");
      }
      await utils.tweet.getAll.invalidate();
      await utils.tweet.getComments.invalidate({ tweet: tweetId });
      await utils.tweet.getProfileTweets.invalidate();
    },
  });
  return deleteTweet;
};

export { useDeleteTweet };
