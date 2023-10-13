import type { GetServerSidePropsContext } from "next";
import { Layout } from "~/components/layouts/layout";
import { Feed } from "~/features/Feed/feed";
import { getServerAuthSession } from "~/server/auth";

export default function Home() {
  return (
    <Layout title="Feed | NotTwitter" hasTopBar={false}>
      <Feed />
    </Layout>
  );
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
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
