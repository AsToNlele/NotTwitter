import Image from "next/image";
import type { RouterOutputs } from "~/utils/api";

interface ProfileAvatarProps {
  data: RouterOutputs["profile"]["getOne"] | undefined;
}
export const ProfileAvatar = ({ data }: ProfileAvatarProps) => (
  <div className="relative -mt-[calc(12.5%+1rem)] h-auto w-[25%] min-w-[44px] sm:-mt-[12.5%] sm:w-[calc(25%-2rem)]">
    <Image
      src={data?.image ?? "/profile.png"}
      alt={data?.name ?? ""}
      height={200}
      width={200}
      className="min-w-[44px] rounded-full"
    />
  </div>
);
