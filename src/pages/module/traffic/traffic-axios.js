import {Api} from "../../../api/base";
import axios from "axios";
import Taro from "@tarojs/taro";

const {uploadApi,searchApi,notFoundApi} = Api.traffic

const trafficAxios = {
    uploadSearchAxios:(filePath,header = {},formData = {})=>{
        return new Promise((resolve,reject) => {
            Taro.uploadFile({
                url:uploadApi,
                name:'file',
                filePath:filePath,
                header:{},
                formData:{},
                success: res=>resolve(res),
                fail:error=>reject(error)
            })
        })

    },
    searchAxios: (key)=>{
        return axios.get(searchApi,{
            params:{
                key:key
            }
        });
    },
    notFoundAxios:(id)=>{
        return axios.post(notFoundApi,{
            params:{
                id:id
            }
        });
    }
}

export const {uploadSearchAxios,searchAxios,notFoundAxios} = trafficAxios

