import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  token: string|null;
  id: string|null;
};

type Actions = {
  setUser: (token: string, id: string) => void;
  reset: () => void;
};

const setUserToken = create<State & Actions>()(
  persist(
    (set) => ({
      token: null,
      id: null,
      setUser: (token, id) => {
        set(() => ({
          token: token ,
          id: id ,
        }));
      },
      reset: () => {
        set(() => ({
          token: null,
          id: null,
        }));
      },
    }),
    {
      name: "state-user-token",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default setUserToken;