import {
  DropdownMenu,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { Home as HomeIcon, Twitter, X } from "lucide-react";
import Head from "next/head";
import { type FocusEvent, useCallback, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Home() {
  const [content, setContent] = useState<string>("");

  const onContentBlur = useCallback((evt: FocusEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    setContent(sanitizeHtml(evt.target.innerHTML));
  }, []);
  return (
    <>
      <Head>
        <title>NotTwitter</title>
      </Head>
      <main>
        <div className="flex">
          <div className="hidden shrink basis-auto flex-col items-end xs:flex md:shrink-0 md:grow">
            <div className="flex h-screen w-[100px] flex-col justify-between py-2 lg:w-[200px]">
              <div className="flex flex-col gap-5">
                <div className="flex h-8 justify-center px-4 py-2 lg:justify-normal">
                  <Twitter
                    size={30}
                    strokeWidth={1}
                    fill="white"
                    className="relative"
                  >
                    <X
                      color="red"
                      className="absolute left-0 top-0 h-full w-full"
                    />
                  </Twitter>
                </div>
                <div className="items-left flex items-center justify-center gap-4 p-4 lg:justify-normal">
                  <HomeIcon size={30} />
                  <span className="hidden text-xl font-semibold text-primary lg:block">
                    Home
                  </span>
                </div>
              </div>
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full justify-center gap-3 rounded-md px-4 py-2 hover:bg-accent lg:mr-2 lg:justify-normal">
                    <div className="flex justify-center gap-3 lg:justify-normal">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="https://github.com/astonlele.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="hidden flex-col text-sm lg:flex">
                        <span className="font-semibold">AsToN</span>
                        <span className="text-slate-500">@AsToN</span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-24 rounded-md border p-1 lg:w-48">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="mx-0" />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex grow items-start md:grow">
            <div className="w-full xl:w-[900px]">
              <div className="h-screen w-full break-all border-x md:w-[650px]">
                <div className="border-b p-4">
                  <span className="text-xl font-semibold">Home</span>
                </div>
                <div className="border-b p-4">
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="https://github.com/astonlele.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div
                        className="block w-full resize-none pt-1 text-xl outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        role="textbox"
                        contentEditable
                        data-placeholder="What is happening?!"
                        onBlur={onContentBlur}
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button>Tweet</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
