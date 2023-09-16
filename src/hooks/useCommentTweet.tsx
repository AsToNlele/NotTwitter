import { api } from "~/utils/api";

const useCommentTweet = () => {
  const utils = api.useContext();
  const commentTweet = api.comment.comment.useMutation({
    onSettled: async (value) => {
      await utils.tweet.getOne.invalidate({
        tweet: value?.parentTweetId ?? "",
      });
      await utils.tweet.getComments.invalidate();
    },
  });

  return commentTweet;
};

export default useCommentTweet;
