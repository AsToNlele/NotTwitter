import { create } from "zustand";

interface EditProfileDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const useEditProfileDialog = create<EditProfileDialog>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default useEditProfileDialog;
