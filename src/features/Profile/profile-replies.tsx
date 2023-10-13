import Loader from "~/components/loader";
import { Tweet } from "~/components/tweets";
import { useProfileReplies } from "~/features/Profile/hooks/useProfileReplies";

interface ProfileRepliesProps {
  handle: string | undefined;
}

const ProfileReplies = ({ handle }: ProfileRepliesProps) => {
  const { data, isLoading } = useProfileReplies(handle);

  return (
    <>
      {isLoading ? (
        <Loader top />
      ) : (
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} isOnFeed />) ||
        null
      )}
    </>
  );
};

export default ProfileReplies;
