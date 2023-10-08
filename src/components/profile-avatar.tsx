import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { RouterOutputs } from "~/utils/api";

interface ProfileAvatarProps {
  data: RouterOutputs["profile"]["getOne"] | undefined;
}
export const ProfileAvatar = ({ data }: ProfileAvatarProps) => {
  return (
    <div className="relative -mt-[calc(12.5%+1rem)] h-auto w-[25%] min-w-[44px] sm:-mt-[12.5%] sm:w-[calc(25%-2rem)]">
      <Avatar className="h-full w-full min-w-[44px] rounded-full">
        <AvatarImage src={`${data?.image}`} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
