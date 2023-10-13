import Loader from "~/components/loader";
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
        <Loader top />
      ) : (
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} isOnFeed />) ||
        null
      )}
    </>
  );
};

export default ProfileTweets;
