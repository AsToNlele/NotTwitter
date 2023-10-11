import { Loader2 } from "lucide-react";
import { Tweet } from "~/components/tweets";
import { useProfileTweets } from "~/features/Profile/hooks/useProfileTweets";

interface ProfileTweetsProps {
  handle: string | undefined;
}

const ProfileTweets = ({ handle }: ProfileTweetsProps) => {
  const { data, isLoading } = useProfileTweets(handle);

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

export default ProfileTweets;
