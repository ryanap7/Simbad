import AuthServices from "@/services/authServices";
import { SessionModel } from "@/stores/Sessions/SessionsStore";
import LoadingHelper from "@/utils/LoadingHelper";
import NavigationServices from "@/utils/NavigationServices";
import ToastHelper from "@/utils/ToastHelper";
import { produce } from "immer";

const SessionActions = (set: any) => {
  return {
    setLogin: (data: any) => {
      set(
        produce((state: SessionModel) => {
          state.isLogin = data.isLogin;
          state.user = data.user;
          state.token = data.token;
        })
      );
    },
    setLogout: () => {
      set(
        produce((state: SessionModel) => {
          state.isLogin = false;
          state.user = undefined;
          state.token = undefined;
        })
      );
    },
    login: async (body: any) => {
      LoadingHelper.show();
      try {
        const res = await AuthServices.login(body);
        const { user, access_token } = res.data.data;
        if (res.status === 200) {
          LoadingHelper.hide();
          set(
            produce((state: SessionModel) => {
              state.isLogin = true;
              state.user = user;
              state.token = access_token;
            })
          );
          NavigationServices.replace("/dashboard");
        }
      } catch (error: any) {
        LoadingHelper.hide();
        ToastHelper.show({
          type: "danger",
          message: error.message,
        });
      }
    },
  };
};

export default SessionActions;
