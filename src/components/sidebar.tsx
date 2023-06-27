import { Home as HomeIcon } from "lucide-react";
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

export const Sidebar = () => (
  <div className="hidden shrink basis-auto flex-col items-end xs:flex md:shrink-0 md:grow">
    <div className="flex h-screen w-[100px] flex-col justify-between py-2 lg:w-[200px]">
      <div className="flex flex-col gap-5">
        <div className="flex h-8 justify-center px-4 py-2 lg:justify-normal">
          <Logo />
        </div>
        <div className="items-left flex">
          <div className="mx-2 flex flex-1 cursor-pointer items-center justify-center gap-4 rounded-md p-4 hover:bg-accent lg:mx-0 lg:mr-2 lg:justify-normal">
            <HomeIcon size={30} />
            <span className="hidden text-xl font-semibold text-primary lg:block">
              Home
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="mx-2 flex w-full justify-center gap-3 rounded-md px-4 py-2 hover:bg-accent lg:mx-0 lg:mr-2 lg:justify-normal">
            <div className="flex justify-center gap-3 lg:justify-normal">
              <MyAvatar />
              <div className="hidden lg:block">
                <UserTag />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24 rounded-md border p-1 lg:w-48">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-0" />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
);
