import Link from "next/link";
import type { ReactNode } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export const MyAvatar = ({
  image,
  handle = null,
}: {
  image?: string | null;
  handle?: string | null;
}) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    handle ? <Link href={`/${handle}`}>{children}</Link> : <>{children}</>;
  return (
    <Wrapper>
      <Avatar className="h-10 w-10">
        <AvatarImage src={`${image}`} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Wrapper>
  );
};
