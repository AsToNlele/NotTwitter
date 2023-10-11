import { api } from "~/utils/api";

export const useTagger = (handle: string | undefined) => {
  const { data, isLoading } = api.profile.getHandlesWithPrefix.useQuery(
    {
      handle: handle!,
    },
    { enabled: !!handle },
  );

  return { data, isLoading };
};
