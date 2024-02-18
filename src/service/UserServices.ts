import axios from "axios"
export class UserServices {

 async userRegister(userRegisterData:any){

        return await axios.post("http://localhost:8081/api/v1/auth/register",userRegisterData,
        {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        }
        );
 }
 
 async userLogin(userLoginData:any){

    return await axios.post("http://localhost:8081/api/v1/auth/authenticate",userLoginData,
    {
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
    }
    );
}
}
