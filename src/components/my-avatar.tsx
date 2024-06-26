import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export const MyAvatar = ({ image }: { image?: string | null }) => (
  <Avatar className="h-10 w-10">
    <AvatarImage src={`${image}`} alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);
