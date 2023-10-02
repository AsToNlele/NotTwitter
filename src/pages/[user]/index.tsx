import Image from "next/image";
import { useRouter } from "next/router";
import EditProfileDialog from "~/components/edit-profile-dialog";
import { Layout } from "~/components/layouts/layout";
import { ProfileAvatar } from "~/components/profile-avatar";
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
        <Image
          src={"/background.png"}
          alt={data?.name ?? ""}
          priority={true}
          fill
          className="absolute h-full w-full"
        />
      </AspectRatio>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap justify-between">
          <ProfileAvatar data={data} />
          <EditProfileDialog data={data} />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold leading-tight">{data?.name}</p>
            <p className="text-slate-500">@{data?.handle}</p>
          </div>
          <p>{data?.description}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
