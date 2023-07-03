import { create } from "zustand";

interface TweeterDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const useTweeterDialog = create<TweeterDialog>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default useTweeterDialog;
