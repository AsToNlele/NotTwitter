import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart, Loader2, MessageCircle, Repeat2 } from "lucide-react";
import { useRouter } from "next/router";
import type { TweetWithAuthorAndLikes } from "prisma/customTypes";
import { useLikeTweet } from "~/hooks/useLikeTweet";
import { api } from "~/utils/api";
import { MyAvatar } from "./my-avatar";
import { UserTag } from "./user-tag";

dayjs.extend(relativeTime);

export const Tweets = () => {
  const { data, isLoading } = api.tweet.getAll.useQuery();
  return (
    <>
      {isLoading ? (
        <div className="mt-4 flex grow items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} withLink />) ||
        null
      )}
    </>
  );
};

export const Tweet = ({
  tweet,
  withLink,
}: {
  tweet: TweetWithAuthorAndLikes;
  withLink?: boolean;
}) => {
  const hasLiked = tweet?.likes && tweet.likes.length > 0;
  const likeTweet = useLikeTweet();

  const router = useRouter();

  return (
    <div
      className="flex gap-2 border-b p-4 hover:cursor-pointer"
      id={tweet.id}
      onClick={(e) => {
        if ((e.target as Element).id === tweet.id && withLink) {
          router.push(`/${tweet.author.handle!}/status/${tweet.id}`);
        }
      }}
    >
      <MyAvatar image={tweet.author.image} />
      <div className="flex hover:cursor-default">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <UserTag user={tweet.author} horizontal />
            <span className="text-slate-500">·</span>
            <span className="text-sm text-slate-500">
              {dayjs(tweet.createdAt).fromNow(true)}
            </span>
          </div>
          <div className="flex">
            <span className="whitespace-pre-wrap">{tweet.text}</span>
          </div>
          <div className="mt-1 flex gap-6">
            <div className="group flex cursor-pointer gap-2 py-1 pr-2 text-slate-500 hover:text-blue-500">
              <MessageCircle size={18} />
              <span className="text-sm">25</span>
            </div>
            <div className="group flex cursor-pointer gap-2 py-1 pr-2 text-slate-500 hover:text-green-500">
              <Repeat2 size={18} />
              <span className="text-sm">4</span>
            </div>
            <div
              className={`group flex cursor-pointer gap-2 py-1 pr-2 hover:text-red-500 ${
                hasLiked ? "text-red-500" : "text-slate-500"
              }`}
            >
              <Heart
                size={18}
                fill={hasLiked ? "red" : ""}
                onClick={() => likeTweet.mutate({ tweetId: tweet.id })}
              />
              <span className="text-sm">{tweet._count.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
