import { create } from "zustand";

type IUserStore = {
  login: boolean;
  userName: string;
  userId:number,
  token: string;
  setLogin: (login: boolean) => void;
  setUserData: (userName: string, token: string,userId:number) => void;
};

export const useUserStore = create<IUserStore>((set) => {


  return {
    login: false,
    userName: "",
    userId:0,
    token: "",
    setLogin: (login) => {
      set(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(login)); 
        return { login };
      });
    },
    setUserData: (userName, token,userId) => set(() => ({ userName, token,userId })),
  };
});