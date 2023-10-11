import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { memo } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import useCommentTweet from "~/hooks/useCommentTweet";
import useCreateTweet from "~/hooks/useCreateTweet";
import { useTagger } from "~/hooks/useTagger";
import useTweeter from "~/features/Tweeter/hooks/useTweeter";
import useTweeterDialog from "~/features/Tweeter/hooks/useTweeterDialog";
import { MyAvatar } from "../../components/my-avatar";
import { Button } from "../../components/ui/button";
import { TweeterInput } from "~/features/Tweeter/tweeter-input";

const Tagger = memo(function Tagger({
  handle,
  selectHandle,
}: {
  handle: string;
  selectHandle: (handle: string) => void;
}) {
  const { data } = useTagger(handle);
  return (
    <div className="relative">
      <div
        className={`${
          data && data?.length > 0 ? "block" : "hidden"
        } bg-red absolute left-0 top-0 h-full w-full bg-opacity-50`}
      >
        <ScrollArea className="bg-red h-32 w-[50%] rounded-md border">
          <div className="flex flex-col gap-2 bg-red-400 p-4">
            {data?.map((d) => (
              <div
                key={d.handle}
                className="flex gap-2 hover:bg-green-400"
                onClick={() => selectHandle(d.handle!)}
              >
                <MyAvatar image={d.image} />
                <div className="flex flex-col">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-gray-500">@{d.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
});

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
