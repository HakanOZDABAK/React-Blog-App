import { create } from "zustand";

type IUserStore = {
  login: boolean;
  userName: string;
  token: string;
  setLogin: (login: boolean) => void;
  setUserData: (userName: string, token: string) => void;
};

export const useUserStore = create<IUserStore>((set) => {
  const storedLoginState = localStorage.getItem("isLoggedIn");
  const initialLoginState = storedLoginState ? JSON.parse(storedLoginState) : false;

  return {
    login: initialLoginState,
    userName: "",
    token: "",
    setLogin: (login) => {
      set(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(login)); 
        return { login };
      });
    },
    setUserData: (userName, token) => set(() => ({ userName, token })),
  };
});