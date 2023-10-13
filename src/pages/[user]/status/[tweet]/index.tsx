import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Layout } from "~/components/layouts/layout";
import Loader from "~/components/loader";
import { Tweet } from "~/components/tweets";
import { Separator } from "~/components/ui/separator";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const TweetPage = () => {
  const router = useRouter();
  const { tweet } = router.query;

  const tweetId = Array.isArray(tweet) ? tweet[0] : tweet;

  const {
    data: tweetWithParents,
    isLoading,
    isSuccess,
  } = api.tweet.getOneWithParents.useQuery(
    {
      tweet: tweetId!,
    },
    { enabled: !!tweetId },
  );

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      tweetWithParents?.parentTweets &&
      tweetWithParents?.parentTweets?.length > 0 &&
      elementRef.current
    ) {
      const offset = 61 + 20;
      elementRef.current.scrollIntoView();
      window.scrollBy(0, -offset);
    }
  }, [isSuccess]);

  if (!tweetWithParents?.tweet) {
    return null;
  }

  return (
    <Layout
      hasTopBar
      backButtonHref={
        tweetWithParents?.tweet?.parentTweetId &&
        tweetWithParents?.tweet?.author
          ? `/${tweetWithParents?.tweet?.author.handle}/status/${tweetWithParents?.tweet?.parentTweetId}`
          : "/"
      }
      topBarText="Tweet"
      title="Tweet | NotTwitter"
    >
      {isLoading ? (
        <Loader top />
      ) : (
        <div className="pt-4">
          {tweetWithParents?.parentTweets?.map((parent) => (
            <div key={parent.id}>
              <Tweet tweet={parent} isOnFeed hideBorder isParentTweet />
              <div className="flex-1 px-9">
                <Separator orientation="vertical" className="h-8" decorative />
              </div>
            </div>
          ))}

          <div className="min-h-screen" id="here" ref={elementRef}>
            <Tweet tweet={tweetWithParents.tweet} isMainTweet />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TweetPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerAuthSession(context);
  if (!session || (session && !session.user)) {
    return {
      redirect: {
        destination: "/sign-up",
      },
    };
  }
  return { props: {} };
};
