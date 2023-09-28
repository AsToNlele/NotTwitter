import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "~/components/layouts/layout";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { api } from "~/utils/api";

const ProfilePage = () => {
  const router = useRouter();
  const { user } = router.query;

  const userHandle = Array.isArray(user) ? user[0] : user;

  const { data, isLoading } = api.profile.getOne.useQuery(
    {
      handle: userHandle!,
    },
    { enabled: !!userHandle },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout topBarText={data?.name ?? ""} backButtonHref="/">
      <AspectRatio ratio={3 / 1}>
        <Image src={"/background.png"} alt={data?.name ?? ""} layout="fill" />
      </AspectRatio>
      <div className="flex flex-col gap-1 p-4">
        <div className="-mt-[12.5%] flex flex-wrap">
          <div className="relative h-auto w-1/4 min-w-[44px] px-4 ">
            <Image
              src={data?.image ?? "/profile.png"}
              alt={data?.name ?? ""}
              height={200}
              width={200}
              className="min-w-[44px] rounded-full"
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-bold leading-tight">{data?.name}</p>
          <p className="text-slate-500">@{data?.handle}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;