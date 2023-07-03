import Image from "next/image";
import { Command } from "lucide-react";

import { UserAuthForm } from "~/components/sign-up-form";

export default function SignUp() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            NotTwitter
          </div>
        </div>
        <div className="mt-16 xs:mt-0 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign Up / Sign In
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
