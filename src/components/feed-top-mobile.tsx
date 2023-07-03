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
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export const FeedTopMobile = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-between xs:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <MyAvatar image={data?.user.image} />
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Account Info</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <MyAvatar image={data?.user.image} />
              <UserTag user={data?.user} />
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
          <Button className="mt-4" onClick={() => signOut()}>
            Logout
          </Button>
        </SheetContent>
      </Sheet>
      <Logo />
      <div className="h-10 w-10"></div>
    </div>
  );
};
