import { Twitter, X, Home as HomeIcon } from "lucide-react";
import Head from "next/head";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Home() {
  return (
    <>
      <Head>
        <title>NotTwitter</title>
      </Head>
      <main>
        <div className="flex">
          <div className="flex shrink-0 grow basis-auto flex-col items-end">
            <div className="flex h-screen w-[275px] flex-col justify-between py-4">
              <div className="flex flex-col gap-5">
                <div className="h-8">
                  <div className="relative">
                    <Twitter
                      size={30}
                      strokeWidth={1}
                      fill="white"
                      className="absolute"
                    />
                    <X size={30} color="red" className="absolute" />
                  </div>
                </div>
                <div className="flex">
                  <div className="items-left flex flex-col">
                    <div className="flex items-center gap-4">
                      <HomeIcon size={30} />
                      <span className="text-xl font-semibold text-primary">
                        Home
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://github.com/astonlele.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">AsToN</span>
                  <span className="text-slate-500">@AsToN</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex shrink grow items-start">
            <div className="w-[900px]">
              <div className="h-screen w-[650px] break-all border-x">Feed</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
