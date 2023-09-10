import { api } from "~/utils/api";

const useCommentTweet = () => {
  const utils = api.useContext();
  const commentTweet = api.comment.comment.useMutation({
    onSettled: (value) => {
      utils.tweet.getOne.invalidate({ tweet: value?.parentTweetId ?? "" });
      utils.tweet.getComments.invalidate();
    },
  });

  return commentTweet;
};

export default useCommentTweet;
