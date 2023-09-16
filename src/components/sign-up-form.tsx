import * as React from "react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { signIn } from "next-auth/react";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => void signIn("discord", { callbackUrl: "/" })}
      >
        Discord
      </Button>
    </div>
  );
}
