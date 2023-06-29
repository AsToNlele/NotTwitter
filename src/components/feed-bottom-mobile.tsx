import { Home, Search, Bell, Mail } from "lucide-react";

export const FeedBottomMobile = () => (
  <div className="fixed bottom-0 z-10 flex w-full items-center justify-evenly gap-6 border-t bg-black py-4 xs:hidden">
    <Home className="h-7 w-7" />
    <Search className="h-7 w-7" />
    <Bell className="h-7 w-7" />
    <Mail className="h-7 w-7" />
  </div>
);
