import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import type { FocusEvent } from "react";
import { memo, useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import useCommentTweet from "~/hooks/useCommentTweet";
import useCreateTweet from "~/hooks/useCreateTweet";
import useTweeterDialog from "~/hooks/useTweeterDialog";
import { getCaret, setCaret } from "~/lib/utils";
import { MyAvatar } from "./my-avatar";
import { Button } from "./ui/button";
import { useTagger } from "~/hooks/useTagger";
import { ScrollArea } from "~/components/ui/scroll-area";

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
  const [content, setContent] = useState<string>("");
  const setOpen = useTweeterDialog((state) => state.setOpen);
  const { data } = useSession();
  const { mutate: createTweet, isLoading: isCreateLoading } = useCreateTweet();
  const { mutate: commentTweet, isLoading: isCommentLoading } =
    useCommentTweet();

  const divRef = useRef<HTMLDivElement>(null);
  const [tag, setTag] = useState("");
  const caretPos = useRef<number>(0);
  const indexDiff = useRef<number>(0);

  useEffect(() => {
    setCaret(divRef.current, caretPos.current + indexDiff.current);
    indexDiff.current = 0;
    divRef.current?.focus();

    const position = getCaret(divRef.current);

    setTag(getTag(content, position));
  }, [content]);

  const handleSelectHandle = (handle: string) => {
    const caretPosition = caretPos.current;

    const atIndex = content.lastIndexOf("@", caretPosition - 1);
    if (atIndex === -1) {
      return "";
    }

    const whitespaceIndex = content.indexOf(" ", caretPosition);
    const endIndex = whitespaceIndex === -1 ? content.length : whitespaceIndex;
    const finalString =
      content.substring(0, atIndex) +
      "@" +
      handle +
      content.substring(endIndex);

    indexDiff.current = handle.length + 1 - (endIndex - atIndex);

    setContent(finalString);
  };

  const getTag = (content: string, caretPosition: number): string => {
    const atIndex = content.lastIndexOf("@", caretPosition - 1);
    if (atIndex === -1) {
      return "";
    }

    const prefix = content[atIndex - 1];
    if (prefix && !/\s/.test(prefix)) {
      return "";
    }

    const afterAt = content.slice(atIndex + 1, caretPosition);
    if (afterAt.includes(" ")) {
      return "";
    }

    const whitespaceIndex = content.indexOf(" ", caretPosition);
    const tagEndIndex =
      whitespaceIndex === -1 ? content.length : whitespaceIndex;

    return content.slice(atIndex + 1, tagEndIndex);
  };

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
