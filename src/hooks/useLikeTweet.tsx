import { api } from "~/utils/api";

const useLikeTweet = () => {
  const utils = api.useContext();
  const likeTweet = api.like.like.useMutation({
    onSettled: (value) => {
      utils.tweet.getAll.invalidate();
      utils.tweet.getOne.invalidate({ tweet: value?.tweetId });
    },
  });

  return likeTweet;
};

export { useLikeTweet };
