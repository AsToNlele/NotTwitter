import type { FocusEvent } from "react";
import { useCallback, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { MyAvatar } from "./my-avatar";
import { Button } from "./ui/button";
import useTweeterDialog from "~/hooks/useTweeterDialog";
import { useSession } from "next-auth/react";
import useCreateTweet from "~/hooks/useCreateTweet";
import { Loader2 } from "lucide-react";
import useCommentTweet from "~/hooks/useCommentTweet";

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
  const [content, setContent] = useState<string>("");
  const setOpen = useTweeterDialog((state) => state.setOpen);
  const { data } = useSession();
  const { mutate: createTweet, isLoading: isCreateLoading } = useCreateTweet();
  const { mutate: commentTweet, isLoading: isCommentLoading } =
    useCommentTweet();

  const onContentBlur = useCallback((evt: FocusEvent<HTMLInputElement>) => {
    setContent(
      sanitizeHtml(evt.target.innerHTML, {
        allowedTags: [],
        textFilter(text, tagName) {
          if (tagName === "div") {
            return "\n" + text;
          }
          return text;
        },
      }),
    );
  }, []);
  return (
    <div
      className={`${
        isModal ? "pt-8" : isReply ? "" : "hidden border-b p-4 xs:block"
      }`}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <MyAvatar image={data?.user.image} />
          <div
            className="block max-h-[80vh] w-full resize-none overflow-y-auto whitespace-pre-wrap pt-1 text-xl outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            role="textbox"
            contentEditable
            data-placeholder={
              isReply ? "Post your reply!" : "What is happening?!"
            }
            onBlur={onContentBlur}
            dangerouslySetInnerHTML={{ __html: content }}
          />
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
