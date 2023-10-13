import Loader from "~/components/loader";
import { Tweet } from "~/components/tweets";
import { useProfileLikes } from "~/features/Profile/hooks/useProfileLikes";

interface ProfileLikesProps {
  handle: string | undefined;
}

const ProfileLikes = ({ handle }: ProfileLikesProps) => {
  const { data, isLoading } = useProfileLikes(handle);

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

export default ProfileLikes;
