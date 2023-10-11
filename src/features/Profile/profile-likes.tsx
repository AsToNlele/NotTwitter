import { Loader2 } from "lucide-react";
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
        <div className="mt-4 flex grow items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} isOnFeed />) ||
        null
      )}
    </>
  );
};

export default ProfileLikes;
