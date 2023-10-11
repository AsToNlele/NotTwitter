import type { TweetWithAuthorAndLikes } from "prisma/customTypes";
import { create } from "zustand";

interface TweeterDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  replyTo: TweetWithAuthorAndLikes | null;
  setOpenWithComment: (replyTo: TweetWithAuthorAndLikes | null) => void;
}
const useTweeterDialog = create<TweeterDialog>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open, replyTo: null }),
  replyTo: null,
  setOpenWithComment: (replyTo: TweetWithAuthorAndLikes | null) =>
    set({ replyTo, open: true }),
}));

export default useTweeterDialog;
