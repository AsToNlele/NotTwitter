import type { FocusEvent } from "react";
import { useCallback, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { MyAvatar } from "./my-avatar";
import { Button } from "./ui/button";

export const Tweeter = ({ mobile = false }: { mobile?: boolean }) => {
  const [content, setContent] = useState<string>("");

  const onContentBlur = useCallback((evt: FocusEvent<HTMLInputElement>) => {
    setContent(sanitizeHtml(evt.target.innerHTML));
  }, []);
  return (
    <div className={`${mobile ? "pt-8" : "hidden border-b p-4 xs:block"}`}>
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <MyAvatar />
          <div
            className="block w-full resize-none pt-1 text-xl outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            role="textbox"
            contentEditable
            data-placeholder="What is happening?!"
            onBlur={onContentBlur}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="flex justify-end">
          <Button className="font-semibold">Tweet</Button>
        </div>
      </div>
    </div>
  );
};
