import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import useTweeter from "~/features/Tweeter/hooks/useTweeter";
import useTweeterDialog from "~/features/Tweeter/hooks/useTweeterDialog";
import { TweeterInput } from "~/features/Tweeter/tweeter-input";
import useCommentTweet from "~/hooks/useCommentTweet";
import useCreateTweet from "~/hooks/useCreateTweet";
import { MyAvatar } from "../../components/my-avatar";
import { Button } from "../../components/ui/button";
import Tagger from "~/features/Tweeter/tagger";

interface TweeterProps {
  isModal?: boolean;
  isReply?: boolean;
  replyTweetId?: string;
}

export const Tweeter = ({
  isModal,
  isReply = false,
  replyTweetId = "",
}: TweeterProps) => {
  const { mutate: createTweet, isLoading: isCreateLoading } = useCreateTweet();
  const { mutate: commentTweet, isLoading: isCommentLoading } =
    useCommentTweet();

  const { content, setContent, tag, handleSelectHandle, tweeterConfig } =
    useTweeter();

  const setOpen = useTweeterDialog((state) => state.setOpen);
  const { data } = useSession();

  return (
    <div
      className={`${
        isReply ? "" : isModal ? "pt-8" : "hidden border-b p-4 xs:block"
      }`}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <MyAvatar image={data?.user.image} />
          <div className="relative w-full">
            <TweeterInput
              tweeterConfig={tweeterConfig}
              placeholder={isReply ? "Post your reply!" : "What is happening?!"}
              content={content}
            />
            <Tagger handle={tag} selectHandle={handleSelectHandle} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="font-semibold"
            onClick={() => {
              setOpen(false);
              if (isReply) {
                commentTweet({ text: content, tweetId: replyTweetId });
              } else {
                createTweet({ text: content });
              }
              setContent("");
            }}
          >
            {isCreateLoading || isCommentLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Tweet"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
