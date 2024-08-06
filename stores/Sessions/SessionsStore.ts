import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import MMKVServices from "@/utils/MMKVServices";
import SessionActions from "./SessionsActions";

export interface SessionModel {
  isLogin: boolean;
  user: any;
  token?: string;
  setLogin: (data: any) => void;
  setLogout: () => void;
  login: (body: any) => void;
}

const InitialStore = {
  isLogin: false,
  user: undefined,
  token: undefined,
};

export const sessionStore = createStore<SessionModel>()(
  persist(
    (set) => ({
      ...InitialStore,
      ...SessionActions(set),
    }),
    {
      name: "session-store",
      version: 2,
      storage: createJSONStorage(() => new MMKVServices("session-store")),
    }
  )
);

const useSessionStore = (selector: any) => useStore(sessionStore, selector);

export default useSessionStore;
