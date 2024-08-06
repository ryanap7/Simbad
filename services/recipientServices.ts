import API from "@/config/Axios";

const RecipientServices = {
  getRecipientByVillage: async (page: number, village_id: string) => {
    try {
      const response = await API.get(
        `/recipients?village_id=${village_id}&page=${page}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  getLastDistribution: async (recipient_id: string) => {
    try {
      const response = await API.get(
        `/distributions?recipient_id=${recipient_id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  submitDistribution: async (body: any) => {
    try {
      const response = await API.post(`/distributions`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default RecipientServices;
