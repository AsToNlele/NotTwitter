import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  BookmarkIcon,
  BoxIcon,
  Heart,
  Loader2,
  MessageCircle,
  Repeat2,
  ShareIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/router";
import type { TweetWithAuthorAndLikes } from "prisma/customTypes";
import { Separator } from "~/components/ui/separator";
import { useLikeTweet } from "~/hooks/useLikeTweet";
import { api } from "~/utils/api";
import { MyAvatar } from "./my-avatar";
import { UserTag } from "./user-tag";
import { Tweeter } from "~/components/tweeter";
import { TweeterDialog } from "~/components/tweeter-dialog";
import useTweeterDialog from "~/hooks/useTweeterDialog";

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
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} isOnFeed />) ||
        null
      )}
    </>
  );
};

interface TweetProps {
  tweet: TweetWithAuthorAndLikes;
  isOnFeed?: boolean;
}

export const tweetFeedDate = (date: Date) => {
  if (!date) return null;
  return dayjs(new Date()).diff(date, "hours") > 24
    ? dayjs(date).format("MMM D")
    : dayjs(date).fromNow(true);
};

const tweetDate = (date: Date) => {
  if (!date) return null;
  return dayjs(date).format("H:mm A · MMM D, YYYY");
};

export const Tweet = ({ tweet, isOnFeed = false }: TweetProps) => {
  const router = useRouter();
  const { data: commentData } = api.tweet.getComments.useQuery(
    {
      tweet: tweet.id,
    },
    {
      enabled: !isOnFeed,
    },
  );
  console.log("DATA", tweet);

  return (
    <>
      <div
        className="flex cursor-pointer flex-col gap-4 border-b p-4"
        id={tweet.id}
        onClick={(e) => {
          if ((e.target as Element).id === tweet.id && isOnFeed) {
            router.push(`/${tweet.author.handle!}/status/${tweet.id}`);
          }
        }}
      >
        <div className="flex gap-2">
          <MyAvatar image={tweet.author.image} />
          <div className="flex flex-1 flex-col gap-0 hover:cursor-default">
            <div className="flex flex-col">
              <div className="flex items-center gap-1" id={tweet.id}>
                <UserTag user={tweet.author} horizontal={isOnFeed} />
                {isOnFeed && (
                  <>
                    <span className="text-slate-500">·</span>
                    <span className="text-sm text-slate-500">
                      {tweetFeedDate(tweet.createdAt)}
                    </span>
                  </>
                )}
                <div id={tweet.id} className="flex-1 hover:cursor-pointer">
                  &shy;
                </div>
              </div>
            </div>
            {isOnFeed && (
              <>
                <div className="flex hover:cursor-pointer" id={tweet.id}>
                  <span className="whitespace-pre-wrap">{tweet.text}</span>
                </div>
                <div
                  className="mt-2 flex justify-between hover:cursor-pointer"
                  id={tweet.id}
                >
                  <TweetActionsAndStatuses tweet={tweet} isOnFeed />
                </div>
              </>
            )}
          </div>
        </div>
        {!isOnFeed && (
          <>
            <div className="flex">
              <span className="whitespace-pre-wrap">{tweet.text}</span>
            </div>
            <div className="flex">
              <span className="text-base text-slate-500">
                {tweetDate(tweet.createdAt)}
              </span>
            </div>
            <Separator />
            <TweetActionsAndStatuses tweet={tweet} />
            <Separator />
            <Tweeter isReply replyTweetId={tweet.id} />
          </>
        )}
      </div>
      {!isOnFeed &&
        commentData?.map((comment) => (
          <Tweet key={tweet.id} tweet={comment} isOnFeed />
        ))}
      <div></div>
    </>
  );
};

interface TweetActionsAndStatusesProps {
  tweet: TweetWithAuthorAndLikes;
  isOnFeed?: boolean;
}

const TweetActionsAndStatuses = ({
  tweet,
  isOnFeed = false,
}: TweetActionsAndStatusesProps) => {
  return isOnFeed ? (
    <TweetActions tweet={tweet} isOnFeed />
  ) : (
    <div className="flex flex-col gap-4">
      <TweetStatuses tweet={tweet} />
      <Separator />
      <div className="flex justify-between">
        <TweetActions tweet={tweet} />
      </div>
    </div>
  );
};

enum TweetStatusTypes {
  Like,
  Repost,
  Quote,
  Reply,
  Bookmark,
}

interface TweetStatusProps {
  type: TweetStatusTypes;
  title: string;
  value: number;
}

const TweetStatus = ({ title, value }: TweetStatusProps) => {
  return (
    <span className="text-sm font-light text-slate-500" key={"status"}>
      <span className="font-bold text-primary">{value} </span>
      {title}
    </span>
  );
};

interface TweetStatusesProps {
  tweet: TweetWithAuthorAndLikes;
}

const TweetStatuses = ({ tweet }: TweetStatusesProps) => {
  const statuses: TweetStatusProps[] = [
    {
      type: TweetStatusTypes.Reply,
      title: "Replies",
      value: tweet._count.replies,
    },
    {
      type: TweetStatusTypes.Repost,
      title: "Reposts",
      value: 4,
    },
    {
      type: TweetStatusTypes.Quote,
      title: "Quotes",
      value: 57,
    },
    {
      type: TweetStatusTypes.Like,
      title: "Likes",
      value: tweet._count.likes,
    },
    {
      type: TweetStatusTypes.Bookmark,
      title: "Bookmarks",
      value: 143,
    },
  ];
  return (
    <div className="flex flex-wrap gap-6">
      {statuses.map((status) => (
        <TweetStatus key={status.type} {...status} />
      ))}
    </div>
  );
};

enum TweetActionTypes {
  Like,
  Comment,
  Repost,
  Bookmark,
  Share,
}

interface TweetActionProps {
  type: TweetActionTypes;
  showCount?: boolean;
  count?: number;
  Icon?: LucideIcon;
  iconSize?: number;
  color?: string;
  handleAction?: () => void;
  isActive?: boolean;
  activeColor?: string;
}

const TweetAction = ({
  type,
  showCount = false,
  count = 0,
  Icon = BoxIcon,
  iconSize = 18,
  color = "text-blue-500",
  handleAction,
  isActive = false,
  activeColor = "blue",
}: TweetActionProps) => {
  return (
    <div
      key={type}
      className={`flex cursor-pointer gap-4 ${
        isActive ? color : "text-slate-500"
      } hover:${color}`}
      onClick={handleAction}
    >
      <Icon size={iconSize} fill={isActive ? activeColor : ""} />
      {showCount && <span className="text-sm">{count}</span>}
    </div>
  );
};

interface TweetActionsProps {
  tweet: TweetWithAuthorAndLikes;
  isOnFeed?: boolean;
}

const TweetActions = ({ tweet, isOnFeed = false }: TweetActionsProps) => {
  const likeTweet = useLikeTweet();
  const tweeterdialog = useTweeterDialog((state) => state);
  // tweeterdialog.setReplyTo(tweet);

  const tweetActions: TweetActionProps[] = [
    {
      type: TweetActionTypes.Comment,
      showCount: isOnFeed,
      count: tweet._count.replies,
      Icon: MessageCircle,
      color: "text-blue-500",
      handleAction: () => tweeterdialog.setOpenWithComment(tweet),
    },
    {
      type: TweetActionTypes.Repost,
      showCount: isOnFeed,
      count: 4,
      Icon: Repeat2,
      color: "text-green-500",
    },
    {
      type: TweetActionTypes.Like,
      showCount: isOnFeed,
      count: tweet?._count.likes,
      Icon: Heart,
      color: "text-red-500",
      handleAction: () => likeTweet.mutate({ tweetId: tweet.id }),
      isActive: tweet.likes.length > 0,
      activeColor: "red",
    },
    {
      type: TweetActionTypes.Bookmark,
      showCount: false,
      Icon: BookmarkIcon,
      count: 143,
    },
    {
      type: TweetActionTypes.Share,
      showCount: false,
      Icon: ShareIcon,
      count: 0,
    },
  ];

  return (
    <>
      <TweeterDialog />
      {tweetActions.map((action) => (
        <div
          key={`${action.type}${tweet.id}`}
          className={`${
            isOnFeed
              ? "flex justify-between hover:cursor-pointer"
              : "flex flex-1 justify-center"
          }`}
        >
          <TweetAction {...action} iconSize={isOnFeed ? 18 : 20} />
        </div>
      ))}
    </>
  );
};
