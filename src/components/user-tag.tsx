import type { User } from "@prisma/client";
import Link from "next/link";

export const UserTag = ({
  horizontal = false,
  user,
}: {
  horizontal?: boolean;
  user?: User | null;
}) => {
  return (
    <Link href={`/${user?.handle ?? "#"}`}>
      <div
        className={`flex items-start text-sm ${
          horizontal ? "gap-1" : "flex-col"
        }`}
      >
        <span className="font-semibold hover:underline">
          {user?.name ?? "Test"}
        </span>
        <span className="text-slate-500">
          {user?.handle ? `@${user.handle}` : "@Test"}
        </span>
      </div>
    </Link>
  );
};
