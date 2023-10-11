import { memo } from "react";
import { MyAvatar } from "~/components/my-avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useTagger } from "~/features/Tweeter/hooks/useTagger";

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
        } absolute left-0 top-0 h-full w-full bg-primary bg-opacity-50`}
      >
        <ScrollArea
          className={`bg-red ${
            data && data?.length > 1 ? "h-32" : "h-16"
          } w-[50%] rounded-md border`}
        >
          <div className="flex flex-col bg-background pr-3">
            {data?.map((d) => (
              <div
                key={d.handle}
                className="flex gap-2 p-2 hover:bg-accent"
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

export default Tagger;
