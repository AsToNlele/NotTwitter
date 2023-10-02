import { api } from "~/utils/api";

const useEditProfile = () => {
  const utils = api.useContext();
  const editProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => utils.profile.getOne.invalidate(),
  });

  return editProfile;
};

export default useEditProfile;
