import axios from "axios";

import {Api} from "../../api/base";


const {codeApi,usernameApi,wechatApi,refreshTokenApi} = Api.login

const LoginAxios = {
    usernameAxios:(username,password)=>{
        return axios.post(usernameApi,{
            username:username,
            password:password
        })
    },
    codeAxios:(code)=>{
        return axios.post(codeApi,{
            code:code
        })
    },
    wechatAxios:(openId)=>{
        return axios.post(wechatApi,{
            openId:openId
        })
    },
    refreshTokenAxios:(token)=>{
        return axios.get(refreshTokenApi,{
            params:{
                refreshToken:token
            }
        })
    }
}
export default LoginAxios
export  const  {usernameAxios,wechatAxios,codeAxios,refreshTokenAxios} = LoginAxios