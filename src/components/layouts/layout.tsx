import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { FeedBottomMobile } from "~/components/feed-bottom-mobile";
import { Sidebar } from "~/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  hasTopBar?: boolean;
  topBarText?: string;
  backButtonHref?: string;
  hasBottomBar?: boolean;
}

export const Layout = ({
  children,
  title = "NotTwitter",
  hasTopBar = true,
  topBarText = "",
  backButtonHref = "",
  hasBottomBar = true,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="flex">
          <Sidebar />
          <div className="flex grow items-start md:grow">
            <div className="w-full xl:w-[900px]">
              <div className="flex min-h-screen w-full flex-col break-all border-none xs:border-l xs:border-solid md:w-[650px] md:border-x ">
                {hasTopBar && (
                  <div className="sticky top-0 z-10 border-b p-4 backdrop-blur">
                    <span className="flex items-center gap-6 text-xl font-semibold">
                      {backButtonHref && (
                        <Link href={backButtonHref}>
                          <ArrowLeft />
                        </Link>
                      )}{" "}
                      {topBarText}
                    </span>
                  </div>
                )}
                {hasBottomBar && <FeedBottomMobile />}
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
