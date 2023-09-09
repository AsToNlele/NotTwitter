import { api } from "~/utils/api";

const useUnlikeTweet = () => {
  const utils = api.useContext();
  const unlikeTweet = api.like.unlike.useMutation({
    onSettled: (value) => {
      utils.tweet.getAll.invalidate();
      utils.tweet.getOne.invalidate({ tweet: value?.tweetId });
    },
  });

  return unlikeTweet;
};

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

export { useLikeTweet, useUnlikeTweet };
