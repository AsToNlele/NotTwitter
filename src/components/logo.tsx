import { Twitter, X } from "lucide-react";
import { useTheme } from "next-themes";

export const Logo = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Twitter
      size={30}
      strokeWidth={1}
      fill={resolvedTheme === "dark" ? "white" : "black"}
      className="relative"
    >
      <X color="red" className="absolute left-0 top-0 h-full w-full" />
    </Twitter>
  );
};
