import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { LucideIcon } from "lucide-react";
import {
  BookmarkIcon,
  BoxIcon,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  ShareIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { TweetWithAuthorAndLikes } from "prisma/customTypes";
import type { ReactNode } from "react";
import Loader from "~/components/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import useTweeterDialog from "~/features/Tweeter/hooks/useTweeterDialog";
import { Tweeter } from "~/features/Tweeter/tweeter";
import { useDeleteTweet } from "~/hooks/useDeleteTweet";
import { useLikeTweet } from "~/hooks/useLikeTweet";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { MyAvatar } from "./my-avatar";
import { UserTag } from "./user-tag";

dayjs.extend(relativeTime);

export const Tweets = () => {
  const { data, isLoading } = api.tweet.getAll.useQuery();
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

interface TweetProps {
  tweet: TweetWithAuthorAndLikes;
  isOnFeed?: boolean;
  hideBorder?: boolean;
  isParentTweet?: boolean;
  isMainTweet?: boolean;
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

export const DeletedTweet = ({
  tweet,
  isOnFeed = false,
  hideBorder = false,
  isParentTweet = false,
  isMainTweet = false,
}: TweetProps) => {
  const { data: commentData, isLoading: isLoadingComments } =
    api.tweet.getComments.useQuery({
      tweet: tweet.id,
    });
  return (
    <>
      <div
        className={`flex cursor-pointer flex-col gap-4 ${
          !hideBorder && "border-b"
        } ${isParentTweet ? "px-4" : isMainTweet ? "px-4 pb-4" : "p-4"}`}
      >
        <div className="flex gap-2">
          <div className="flex flex-col">
            {isParentTweet && (
              <Separator
                orientation="vertical"
                className="mx-5 flex-1"
                decorative
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-0 hover:cursor-default">
            <div className="flex flex-col"></div>
            {isOnFeed && (
              <>
                <div className="flex hover:cursor-pointer">
                  <span className="whitespace-pre-wrap">
                    {"This tweet has been deleted"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        {!isOnFeed && (
          <>
            <div className="flex">
              <span className="whitespace-pre-wrap">
                This tweet has been deleted.
              </span>
            </div>
            <div className="flex"></div>
          </>
        )}
      </div>
      {!isOnFeed &&
        (isLoadingComments ? (
          <Loader />
        ) : (
          commentData?.map((comment) => (
            <Tweet key={tweet.id} tweet={comment} isOnFeed />
          ))
        ))}
      <div></div>
    </>
  );
};

export const Tweet = ({
  tweet,
  isOnFeed = false,
  hideBorder = false,
  isParentTweet = false,
  isMainTweet = false,
}: TweetProps) => {
  const router = useRouter();
  const { data: commentData, isLoading: isLoadingComments } =
    api.tweet.getComments.useQuery(
      {
        tweet: tweet.id,
      },
      {
        enabled: !isOnFeed,
      },
    );

  const deleteTweet = useDeleteTweet();
  const { data: session } = useSession();

  if (!tweet.author) {
    return (
      <DeletedTweet
        tweet={tweet}
        isOnFeed={isOnFeed}
        hideBorder={hideBorder}
        isParentTweet={isParentTweet}
        isMainTweet={isMainTweet}
      />
    );
  }

  return (
    <>
      <div
        className={`flex cursor-pointer flex-col gap-4 ${
          !hideBorder && "border-b"
        } ${isParentTweet ? "px-4" : isMainTweet ? "px-4 pb-4" : "p-4"}`}
        id={tweet.id}
        onClick={(e) => {
          if ((e.target as Element).id === tweet.id && isOnFeed) {
            void router.push(`/${tweet.author?.handle}/status/${tweet.id}`);
          }
        }}
      >
        <div className="flex gap-2">
          <div className="flex flex-col">
            <MyAvatar image={tweet.author.image} handle={tweet.author.handle} />
            {isParentTweet && (
              <Separator
                orientation="vertical"
                className="mx-5 flex-1"
                decorative
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-0 hover:cursor-default">
            <div className="flex flex-col">
              <div className="flex items-center justify-between" id={tweet.id}>
                <div className="flex items-center gap-1">
                  <UserTag user={tweet.author} horizontal={isOnFeed} />
                  {isOnFeed && (
                    <TweetDate tweet={tweet} className="text-sm" isOnFeed />
                  )}
                </div>
                {tweet.author.id === session?.user?.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="">
                      <MoreHorizontal className="text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      <DropdownMenuItem
                        onClick={() => deleteTweet.mutate({ tweet: tweet.id })}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
            {isOnFeed && (
              <>
                <div className="flex hover:cursor-pointer" id={tweet.id}>
                  <TweetText text={tweet.text} />
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
              <TweetText text={tweet.text} />
            </div>
            <div className="flex">
              <TweetDate tweet={tweet} className="text-base" />
            </div>
            <Separator />
            <TweetActionsAndStatuses tweet={tweet} />
            <Separator />
            <Tweeter isReply replyTweetId={tweet.id} />
          </>
        )}
      </div>
      {!isOnFeed &&
        (isLoadingComments ? (
          <Loader />
        ) : (
          commentData?.map((comment) => (
            <Tweet key={tweet.id} tweet={comment} isOnFeed />
          ))
        ))}
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

const TweetText = ({ text }: { text: string }) => {
  const splitByLines = text.split("\n");
  const elements = splitByLines.map((line) => {
    const splitByWords = line.split(" ");
    return splitByWords.map((word, index) => {
      const prefix = index !== 0 ? " " : "";
      const postfix = index === splitByWords.length - 1 ? <br /> : "";
      if (word.startsWith("@")) {
        return (
          <span key={`${word}${index}`}>
            {prefix}
            <Link
              className="text-blue-500 decoration-blue-500 hover:underline"
              href={`/${word.slice(1)}`}
            >
              @{word.slice(1)}
            </Link>
            {postfix}
          </span>
        );
      }
      return (
        <span key={`${word}${index}`}>
          {prefix}
          {word}
          {postfix}
        </span>
      );
    });
  });
  return <span className="whitespace-pre-wrap">{elements}</span>;
};

const TweetDate = ({
  tweet,
  className,
  isOnFeed,
}: {
  tweet: TweetWithAuthorAndLikes;
  className: string;
  isOnFeed?: boolean;
}) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    isOnFeed ? (
      <Link
        href={`/${tweet?.author?.handle}/status/${tweet.id}`}
        className="text-slate-500 hover:underline"
      >
        {children}
      </Link>
    ) : (
      <>{children}</>
    );
  return (
    <>
      {isOnFeed && <span className="text-slate-500">·</span>}
      <Wrapper>
        <span className={cn("text-slate-500", className)}>
          {isOnFeed
            ? tweetFeedDate(tweet.createdAt)
            : tweetDate(tweet.createdAt)}
        </span>
      </Wrapper>
    </>
  );
};
