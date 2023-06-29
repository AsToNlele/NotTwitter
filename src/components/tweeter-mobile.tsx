import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Edit } from "lucide-react";
import { Tweeter } from "./tweeter";

export const TweeterMobile = () => (
  <div className="fixed bottom-20 right-4 z-20 block xs:hidden ">
    <Dialog>
      <DialogTrigger>
        <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-secondary p-4">
          <Edit className="h-7 w-7" />
        </div>
      </DialogTrigger>
      <DialogContent className="h-screen w-full">
        <Tweeter mobile />
      </DialogContent>
    </Dialog>
  </div>
);
