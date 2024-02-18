import axios from "axios"
export class UserServices {

 async userRegister(userRegisterData:any,token:string){

        return await axios.post("http://localhost:8081/api/v1/auth/register",userRegisterData,
        {
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
        );
 }
 
 async userLogin(userLoginData:any,token:string){

    return await axios.post("http://localhost:8081/api/v1/auth/authenticate",userLoginData,
    {
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    );
}
}
