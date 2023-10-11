import { useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { getCaret, getTag, setCaret } from "~/lib/utils";

const useTweeter = () => {
  const [content, setContent] = useState<string>("");
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

  // This can be avoided when there is a better support for contenteditable="plaintext-only"
  // https://caniuse.com/mdn-html_global_attributes_contenteditable_plaintext-only
  const onKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      document.execCommand("insertLineBreak");
    }
  };

  const onInput = (evt: React.FocusEvent<HTMLDivElement>) => {
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

  return {
    content,
    setContent,
    tag,
    setTag,
    handleSelectHandle,
    tweeterConfig: {
      onKeyDown,
      divRef,
      onInput,
    },
  };
};

export default useTweeter;
