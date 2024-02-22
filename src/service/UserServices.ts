import axios from "axios"
export class UserServices {

userRegister(userRegisterData:any){

        return axios.post("http://localhost:8081/api/v1/auth/register",userRegisterData,
        {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        }
        );
 }
 
userLogin(userLoginData:any){

    return axios.post("http://localhost:8081/api/v1/auth/authenticate",userLoginData,
    {
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
    }
    ).then(result=>result.data)

}
}
