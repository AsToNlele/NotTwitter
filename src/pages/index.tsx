import { Home as HomeIcon, Twitter, X } from "lucide-react";
import Head from "next/head";
import { type FocusEvent, useCallback, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

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
          <div className="flex shrink-0 grow basis-auto flex-col items-end">
            <div className="flex h-screen w-[200px] flex-col justify-between py-4">
              <div className="flex flex-col gap-5">
                <div className="h-8">
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
              <div className="h-screen w-[650px] break-all border-x">
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
