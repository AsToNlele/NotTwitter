import { MyAvatar } from "./my-avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Logo } from "~/components/logo";
import { UserTag } from "./user-tag";

export const FeedTopMobile = () => (
  <div className="flex items-center justify-between xs:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <MyAvatar />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-left">Account Info</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <MyAvatar />
            <UserTag />
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex gap-1 ">
              <span className="font-semibold">41</span>
              <span className="text-slate-500">Following</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">15</span>
              <span className="text-slate-500">Followers</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    <Logo />
    <div className="h-10 w-10"></div>
  </div>
);
