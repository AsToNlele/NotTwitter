import { api } from "~/utils/api";

export const useProfileReplies = (handle: string | undefined) => {
  const { data, isLoading } = api.tweet.getProfileReplies.useQuery(
    {
      handle: handle!,
    },
    { enabled: !!handle },
  );

  return { data, isLoading };
};
