import { api } from "~/utils/api";

const useCreateTweet = () => {
  const utils = api.useContext();
  const createTweet = api.tweet.create.useMutation({
    onSuccess: () => {
      void utils.tweet.getAll.invalidate();
      void utils.tweet.getProfileTweets.invalidate();
    },
  });

  return createTweet;
};

export default useCreateTweet;
