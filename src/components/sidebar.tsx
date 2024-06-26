import { Home as HomeIcon, User2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MyAvatar } from "~/components/my-avatar";
import { UserTag } from "./user-tag";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import useTweeterDialog from "~/features/Tweeter/hooks/useTweeterDialog";
import { TweeterDialog } from "~/features/Tweeter/tweeter-dialog";

const SidebarItem = ({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) => (
  <div className="mx-2 flex flex-1 cursor-pointer items-center justify-center gap-4 rounded-md p-4 hover:bg-accent lg:mx-0 lg:mr-2 lg:justify-normal">
    <Icon size={30} />
    <span className="hidden text-xl font-semibold text-primary lg:block">
      {title}
    </span>
  </div>
);

export const Sidebar = () => {
  const { data, status } = useSession();
  const setOpen = useTweeterDialog((state) => state.setOpen);
  return (
    <div className="sticky top-0 hidden h-screen shrink basis-auto flex-col items-end xs:flex md:shrink-0 md:grow">
      <div className="flex h-screen w-[100px] flex-col justify-between py-2 lg:w-[200px]">
        <div className="flex flex-col gap-5">
          <div className="flex h-8 justify-center px-4 py-2 lg:justify-normal">
            <Logo />
          </div>
          <div className="items-left flex flex-col gap-2">
            <Link href="/">
              <SidebarItem icon={HomeIcon} title="Home" />
            </Link>
            <Link href={data?.user?.handle ? `/${data.user.handle}` : "#"}>
              <SidebarItem icon={User2} title="Profile" />
            </Link>
            <Button
              className="mx-2 font-semibold lg:mx-0 lg:mr-2"
              onClick={() => setOpen(true)}
            >
              Tweet
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {status === "loading" ? (
            "Loading..."
          ) : status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="mx-2 flex w-full justify-center gap-3 rounded-md px-4 py-2 hover:bg-accent lg:mx-0 lg:mr-2 lg:justify-normal">
                <div className="flex justify-center gap-3 lg:justify-normal">
                  <MyAvatar image={data?.user.image} />
                  <div className="hidden lg:block">
                    <UserTag user={data?.user} />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 rounded-md border p-1 lg:w-48">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-0" />
                <Link
                  href={data?.user?.handle ? `/${data?.user?.handle}` : "#"}
                >
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => void signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
      <TweeterDialog />
    </div>
  );
};
