import { api } from "~/utils/api";

export const useProfileLikes = (handle: string | undefined) => {
  const { data, isLoading } = api.tweet.getProfileLikes.useQuery(
    {
      handle: handle!,
    },
    { enabled: !!handle },
  );

  return { data, isLoading };
};
