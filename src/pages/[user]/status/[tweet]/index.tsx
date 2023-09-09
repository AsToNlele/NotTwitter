import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FeedBottomMobile } from "~/components/feed-bottom-mobile";
import { FeedTopMobile } from "~/components/feed-top-mobile";
import { Sidebar } from "~/components/sidebar";
import { TweeterDialog } from "~/components/tweeter-dialog";
import { Tweet } from "~/components/tweets";
import { api } from "~/utils/api";

const TweetPage = () => {
  const router = useRouter();
  const { tweet } = router.query;

  const tweetId = Array.isArray(tweet) ? tweet[0] : tweet;

  if (!tweetId) return null;

  const { data, isLoading } = api.tweet.getOne.useQuery({
    tweet: tweetId,
  });

  if (isLoading) return null;
  if (!data) return null;
  //   return <Tweet tweet={data} />;
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
                  <FeedTopMobile />
                  <div className="hidden xs:block">
                    <span className="flex items-center gap-6 text-xl font-semibold">
                      <Link href="/">
                        <ArrowLeft />
                      </Link>{" "}
                      Tweet
                    </span>
                  </div>
                </div>
                <FeedBottomMobile />
                <TweeterDialog />
                <Tweet tweet={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TweetPage;
