import MMKVServices from "@/utils/MMKVServices";
import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import RecipientActions from "./RecipientActions";

export interface RecipientModel {
  initialLoading: boolean;
  loading: boolean;
  data: any[];
  page: number;
  getRecipientByVillage: (page: number, village_id: string) => void;
  setLoading: (loading: boolean) => void;
  setInitialLoading: (loading: boolean) => void;
}

const InitialStore = {
  initialLoading: true,
  loading: false,
  data: [],
  page: 1,
};

export const recipientStore = createStore<RecipientModel>()(
  persist(
    (set) => ({
      ...InitialStore,
      ...RecipientActions(set),
    }),
    {
      name: "recipient-store",
      version: 2,
      storage: createJSONStorage(() => new MMKVServices("recipient-store")),
    }
  )
);

const useRecipientStore = (selector: any) => useStore(recipientStore, selector);

export default useRecipientStore;
