import Head from "next/head";
import { Feed } from "~/components/feed";
import { Sidebar } from "~/components/sidebar";

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
