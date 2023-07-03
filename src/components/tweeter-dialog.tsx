import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Edit } from "lucide-react";
import { Tweeter } from "./tweeter";
import useTweeterDialog from "~/hooks/useTweeterDialog";

export const TweeterDialog = () => {
  const { open, setOpen } = useTweeterDialog((state) => {
    return {
      open: state.open,
      setOpen: state.setOpen,
    };
  });
  return (
    <div className="fixed bottom-20 right-4 z-20 block xs:hidden ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-background p-4">
            <Edit className="h-7 w-7" />
          </div>
        </DialogTrigger>
        <DialogContent className="h-screen w-full sm:h-auto sm:max-h-screen">
          <Tweeter isModal />
        </DialogContent>
      </Dialog>
    </div>
  );
};
