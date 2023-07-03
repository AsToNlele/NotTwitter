import { User } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export const MyAvatar = ({ image }: { image?: string | null }) => (
  <Avatar className="h-10 w-10">
    <AvatarImage
      src={`${image ?? "https://github.com/astonlele.png"} `}
      alt="@shadcn"
    />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);
