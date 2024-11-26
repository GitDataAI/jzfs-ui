import { create } from "zustand";
import { Login, UserModule } from "@/libs/v2/module/Auth.tsx";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AuthApi from "@/libs/v2/apis/auth_api.tsx";

export interface useAuthImpl {
  user: UserModule | undefined;
  init: () => Promise<void>;
  login: (data: Login) => Promise<boolean>;
  logout: () => Promise<void>;
}
export const Auth_api = new AuthApi();
const useAuth = create<useAuthImpl>()(
  devtools(
    persist(
      (setState) => ({
        user: undefined,
        async init() {
          const { data } = await Auth_api.local();
          setState({ user: data.data });
        },
        async login(param: Login): Promise<boolean> {
          try {
            const { data } = await Auth_api.login(param);
            if (data.code === 200) {
              setState({ user: data.data });
              return true;
            }
            return false;
          } catch (e) {
            alert(`Error: \`${e}\``);
            return false;
          }
        },
        async logout() {
          try {
            await Auth_api.logout();
            setState({ user: undefined });
            return;
          } catch (e) {
            alert(`Error: \`${e}\``);
            return Promise.reject(e);
          }
        },
      }),
      {
        name: "GitDataAuth",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: "GitDataAuth",
      // Must be set to False when publishing
      enabled: true,
    }
  )
);

export default useAuth;
