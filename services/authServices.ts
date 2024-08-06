import API from "@/config/Axios";

const AuthServices = {
  login: async (body: any) => {
    try {
      const response = await API.post("/login", body);
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await API.get("/logout");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthServices;
