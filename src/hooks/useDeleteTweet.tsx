import { api } from "~/utils/api";

const useDeleteTweet = () => {
  const deleteTweet = api.tweet.delete.useMutation();
  return deleteTweet;
};

export { useDeleteTweet };
