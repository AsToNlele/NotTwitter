import { cn } from "~/lib/utils";

interface TweeterInputProps {
  className?: string;
  placeholder?: string;
  content: string;
  tweeterConfig: {
    onKeyDown: (evt: React.KeyboardEvent<HTMLDivElement>) => void;
    divRef: React.RefObject<HTMLDivElement>;
    onInput: (evt: React.FocusEvent<HTMLDivElement>) => void;
  };
}
export const TweeterInput = ({
  className,
  placeholder = "Placeholder",
  content,
  tweeterConfig,
}: TweeterInputProps) => {
  return (
    <div
      className={cn(
        "block max-h-[80vh] w-full resize-none overflow-y-auto whitespace-pre-wrap pt-1 text-xl outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
        className,
      )}
      role="textbox"
      suppressContentEditableWarning={true}
      contentEditable
      data-placeholder={placeholder}
      ref={tweeterConfig.divRef}
      onKeyDown={(e) => tweeterConfig.onKeyDown(e)}
      onInput={tweeterConfig.onInput}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
