import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Feed } from "~/components/feed";
import { Sidebar } from "~/components/sidebar";
import { getServerAuthSession } from "~/server/auth";

export default function Home() {
  return (
    <>
      <Head>
        <title>NotTwitter</title>
      </Head>
      <main>
        <div className="flex">
          <Sidebar />
          <Feed />
        </div>
      </main>
    </>
  );
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  if (!session || (session && !session.user)) {
    return {
      redirect: {
        destination: "/sign-up",
      },
    };
  }
  return { props: {} };
};
