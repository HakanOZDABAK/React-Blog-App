import {create} from "zustand";

type IUserStore={
    login:boolean,
    userName:string,
    token:string,
    setLogin:any,
    setUserData:any
}

export const useUserStore = create<IUserStore>(set =>{
    return{
        login:false,
        userName:"",
        token:"",
        setLogin:(login = true) =>set(()=>({login})),
        setUserData: (userName: string, token: string) => set(() => ({ userName, token })),
    }
})