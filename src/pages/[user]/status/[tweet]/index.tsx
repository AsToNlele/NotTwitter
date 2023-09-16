import { ArrowLeft } from "lucide-react";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { FeedBottomMobile } from "~/components/feed-bottom-mobile";
import { Sidebar } from "~/components/sidebar";
import { TweeterDialog } from "~/components/tweeter-dialog";
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
    <>
      <Head>
        <title>NotTwitter</title>
      </Head>
      <main>
        <div className="flex">
          <Sidebar />
          <div className="flex grow items-start md:grow">
            <div className="w-full xl:w-[900px]">
              <div className="flex min-h-screen w-full flex-col break-all border-none xs:border-l xs:border-solid md:w-[650px] md:border-x ">
                <div className="sticky top-0 z-10 border-b p-4 backdrop-blur">
                  <span className="flex items-center gap-6 text-xl font-semibold">
                    <Link
                      href={
                        tweetWithParents?.tweet?.parentTweetId &&
                        tweetWithParents?.tweet?.author
                          ? `/${tweetWithParents?.tweet?.author.handle}/status/${tweetWithParents?.tweet?.parentTweetId}`
                          : "/"
                      }
                    >
                      <ArrowLeft />
                    </Link>{" "}
                    Tweet
                  </span>
                </div>
                <FeedBottomMobile />
                <TweeterDialog />
                {!isLoading && isSuccess && (
                  <div className="pt-4">
                    {tweetWithParents?.parentTweets?.map((parent) => (
                      <div key={parent.id}>
                        <Tweet
                          tweet={parent}
                          isOnFeed
                          hideBorder
                          isParentTweet
                        />
                        <div className="flex-1 px-9">
                          <Separator
                            orientation="vertical"
                            className="h-8"
                            decorative
                          />
                        </div>
                      </div>
                    ))}

                    <div className="min-h-screen" id="here" ref={elementRef}>
                      <Tweet tweet={tweetWithParents.tweet} isMainTweet />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
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
