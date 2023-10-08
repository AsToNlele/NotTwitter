import { api } from "~/utils/api";

export const useProfileTweets = (handle: string | undefined) => {
  const { data, isLoading } = api.tweet.getProfileTweets.useQuery(
    {
      handle: handle!,
    },
    { enabled: !!handle },
  );

  return { data, isLoading };
};
