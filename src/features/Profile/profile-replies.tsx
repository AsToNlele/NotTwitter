import { Loader2 } from "lucide-react";
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

export default ProfileReplies;
