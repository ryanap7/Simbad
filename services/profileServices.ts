import API from "@/config/Axios";

const ProfileServices = {
  getProfile: async () => {
    try {
      const response = await API.get("/me");
      return response;
    } catch (error) {
      throw error;
    }
  },
  countRecipientsByVillageId: async (village_id: string) => {
    try {
      const response = await API.get(
        `/distribution/count?village_id=${village_id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ProfileServices;
