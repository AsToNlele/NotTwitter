import { api } from "~/utils/api";

const useCreateTweet = () => {
  const utils = api.useContext();
  const createTweet = api.tweet.create.useMutation({
    onSuccess: () => utils.tweet.getAll.invalidate(),
  });

  return createTweet;
};

export default useCreateTweet;
