import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import type { FocusEvent } from "react";
import { useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import useCommentTweet from "~/hooks/useCommentTweet";
import useCreateTweet from "~/hooks/useCreateTweet";
import useTweeterDialog from "~/hooks/useTweeterDialog";
import { getCaret, setCaret } from "~/lib/utils";
import { MyAvatar } from "./my-avatar";
import { Button } from "./ui/button";

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

  const divRef = useRef<HTMLDivElement>(null);
  const caretPos = useRef<number>(0);

  useEffect(() => {
    setCaret(divRef.current, caretPos.current);
    divRef.current?.focus();
  }, [content]);

  const onInput = (evt: FocusEvent<HTMLDivElement>) => {
    caretPos.current = getCaret(divRef.current);
    setContent(
      sanitizeHtml(evt.target.innerHTML, {
        allowedTags: [],
        allowedAttributes: {
          div: ["style"],
        },
      }),
    );
  };

  // This can be avoided when there is a better support for contenteditable="plaintext-only"
  // https://caniuse.com/mdn-html_global_attributes_contenteditable_plaintext-only
  const onKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      document.execCommand("insertLineBreak");
    }
  };
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
            <div
              className="block max-h-[80vh] w-full resize-none overflow-y-auto whitespace-pre-wrap pt-1 text-xl outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              role="textbox"
              suppressContentEditableWarning={true}
              contentEditable
              data-placeholder={
                isReply ? "Post your reply!" : "What is happening?!"
              }
              ref={divRef}
              onKeyDown={(e) => onKeyDown(e)}
              onInput={onInput}
              dangerouslySetInnerHTML={{ __html: content }}
            />
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
