import type { User } from "@prisma/client";

export const UserTag = ({
  horizontal = false,
  user,
}: {
  horizontal?: boolean;
  user?: User | null;
}) => {
  return (
    <div
      className={`flex items-start text-sm ${
        horizontal ? "gap-1" : "flex-col"
      }`}
    >
      <span className="font-semibold">{user?.name ? user.name : "Test"}</span>
      <span className="text-slate-500">
        {user?.handle ? `@${user.handle}` : "@Test"}
      </span>
    </div>
  );
};
