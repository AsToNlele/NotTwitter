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

export default Tagger;
