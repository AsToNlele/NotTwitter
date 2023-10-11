import Image from "next/image";
import { useRouter } from "next/router";
import EditProfileDialog from "~/components/edit-profile-dialog";
import { Layout } from "~/components/layouts/layout";
import { ProfileAvatar } from "~/features/Profile/profile-avatar";
import ProfileLikes from "~/features/Profile/profile-likes";
import ProfileReplies from "~/features/Profile/profile-replies";
import ProfileTweets from "~/features/Profile/profile-tweets";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
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
      <Tabs defaultValue="tweets">
        <TabsList className="w-full bg-background">
          <TabsTrigger
            className="text-md rounded-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]"
            value="tweets"
          >
            Tweets
          </TabsTrigger>
          <TabsTrigger
            className="text-md rounded-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]"
            value="replies"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            className="text-md rounded-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]"
            value="likes"
          >
            Likes
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="tweets">
          <ProfileTweets handle={userHandle} />
        </TabsContent>
        <TabsContent value="replies">
          <ProfileReplies handle={userHandle} />
        </TabsContent>
        <TabsContent value="likes">
          <ProfileLikes handle={userHandle} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ProfilePage;
