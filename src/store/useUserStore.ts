import {create} from "zustand";

type IUserStore={

    userName:string,
    token:string,
    setUserData:any
}

export const useUserStore = create<IUserStore>(set =>{
    return{

        userName:"",
        token:"",
        setUserData: (userName: string, token: string) => set(() => ({ userName, token })),
    }
})