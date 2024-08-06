import RecipientServices from "@/services/recipientServices";
import ToastHelper from "@/utils/ToastHelper";
import { produce } from "immer";
import { RecipientModel } from "./RecipientStore";

const RecipientActions = (set: any) => {
  return {
    getRecipientByVillage: async (page: number, village_id: string) => {
      try {
        const res = await RecipientServices.getRecipientByVillage(
          page,
          village_id
        );

        const { data, info } = res.data;

        if (res.status === 200) {
          set(
            produce((state: RecipientModel) => {
              if (info.next === null) {
                state.data = data;
              } else {
                state.data = [...state.data, ...data];
              }

              if (info.next !== null) {
                state.page = info.next.split("page=")[1];
              }
            })
          );
          setTimeout(() => {
            set(
              produce((state: RecipientModel) => {
                state.initialLoading = false;
                state.loading = false;
              })
            );
          }, 1000);
        }
      } catch (error: any) {
        set(
          produce((state: RecipientModel) => {
            state.initialLoading = false;
            state.loading = false;
          })
        );
        ToastHelper.show({
          type: "danger",
          message: error.message,
        });
      }
    },
    setLoading: (loading: boolean) => {
      set(
        produce((state: RecipientModel) => {
          state.loading = loading;
        })
      );
    },
    setInitialLoading: (loading: boolean) => {
      set(
        produce((state: RecipientModel) => {
          state.initialLoading = loading;
        })
      );
    },
  };
};

export default RecipientActions;
