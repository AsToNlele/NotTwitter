import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Edit } from "lucide-react";
import { Tweeter } from "./tweeter";
import { useState } from "react";

export const TweeterMobile = () => {
  const [open, setOpen] = useState(false);
  const handleTweet = () => {
    setOpen(false);
  };
  return (
    <div className="fixed bottom-20 right-4 z-20 block xs:hidden ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-background p-4">
            <Edit className="h-7 w-7" />
          </div>
        </DialogTrigger>
        <DialogContent className="h-screen w-full">
          <Tweeter mobile onTweet={handleTweet} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
