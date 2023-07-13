import { api } from "~/utils/api";

const useUnlikeTweet = () => {
  const utils = api.useContext();
  const unlikeTweet = api.like.unlike.useMutation({
    onSettled: () => utils.tweet.getAll.invalidate(),
  });

  return unlikeTweet;
};

const useLikeTweet = () => {
  const utils = api.useContext();
  const likeTweet = api.like.like.useMutation({
    onSettled: () => utils.tweet.getAll.invalidate(),
  });

  return likeTweet;
};

export { useLikeTweet, useUnlikeTweet };
