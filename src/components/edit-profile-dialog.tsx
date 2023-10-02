import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import useEditProfileDialog from "~/hooks/useEditProfileDialog";
import Image from "next/image";
import type { RouterOutputs } from "~/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import useEditProfile from "~/hooks/useEditProfile";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  handle: z.string().min(2).max(50),
  description: z.string().max(160),
});

const EditProfileDialog = ({
  data,
}: {
  data: RouterOutputs["profile"]["getOne"] | undefined;
}) => {
  const { open, setOpen } = useEditProfileDialog();
  const editProfile = useEditProfile();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      handle: data?.handle ?? "",
      description: data?.description ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    editProfile.mutate(values, {
      onSuccess: (data) => {
        setOpen(false);
        if (data.handle !== router.query.user) {
          void router.push(`/${data.handle}`);
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:h-auto sm:max-h-screen">
        <div className="flex flex-col gap-4 pt-4">
          <AspectRatio ratio={3 / 1}>
            <Image
              src={"/background.png"}
              alt={data?.name ?? ""}
              priority={true}
              fill
              className="absolute h-full w-full"
            />
          </AspectRatio>
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-between">
              <div className="relative -mt-[12.5%] h-auto w-1/4 min-w-[44px] px-4 ">
                <Image
                  src={data?.image ?? "/profile.png"}
                  alt={data?.name ?? ""}
                  height={200}
                  width={200}
                  className="min-w-[44px] rounded-full"
                />
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Share your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="Your @" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={editProfile.isLoading}>
                {editProfile.isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
