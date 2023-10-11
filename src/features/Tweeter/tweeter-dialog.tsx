import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../../components/ui/dialog";
import { Edit } from "lucide-react";
import { Tweeter } from "./tweeter";
import useTweeterDialog from "~/features/Tweeter/hooks/useTweeterDialog";
import { tweetFeedDate } from "~/components/tweets";
import { MyAvatar } from "~/components/my-avatar";
import { UserTag } from "~/components/user-tag";
import type { TweetWithAuthorAndLikes } from "prisma/customTypes";
import { Separator } from "~/components/ui/separator";

const TweetPreview = ({ tweet }: { tweet: TweetWithAuthorAndLikes }) => {
  return (
    <div className="flex gap-4 pt-8">
      <div className="flex flex-col">
        <MyAvatar image={tweet?.author?.image} />
        <Separator orientation="vertical" className="mx-5 max-h-8" decorative />
      </div>
      <div className="flex flex-1 flex-col gap-0 hover:cursor-default">
        <div className="flex flex-col">
          <div className="flex items-center gap-1" id={tweet.id}>
            <UserTag user={tweet.author} horizontal />
            <span className="text-slate-500">·</span>
            <span className="text-sm text-slate-500">
              {tweetFeedDate(tweet.createdAt)}
            </span>
            <div id={tweet.id} className="flex-1 hover:cursor-pointer">
              &shy;
            </div>
          </div>
        </div>
        <div className="flex" id={tweet.id}>
          <span className="whitespace-pre-wrap">{tweet.text}</span>
        </div>
      </div>
    </div>
  );
};

export const TweeterDialog = () => {
  const { open, setOpen, replyTo } = useTweeterDialog((state) => {
    return {
      open: state.open,
      setOpen: state.setOpen,
      replyTo: state.replyTo,
    };
  });
  return (
    <div className="fixed bottom-20 right-4 z-20 block xs:hidden ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-background p-4">
            <Edit className="h-7 w-7" />
          </div>
        </DialogTrigger>
        <DialogContent className="w-full sm:h-auto sm:max-h-screen">
          {replyTo && open && <TweetPreview tweet={replyTo} />}
          <Tweeter
            isModal
            isReply={replyTo ? true : false}
            replyTweetId={replyTo?.id}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
