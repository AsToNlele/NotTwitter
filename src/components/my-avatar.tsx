import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export const MyAvatar = () => (
  <Avatar className="h-10 w-10">
    <AvatarImage src="https://github.com/astonlele.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);
