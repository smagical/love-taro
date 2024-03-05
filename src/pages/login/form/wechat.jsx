import './form.scss'
import {OpenData, View} from "@tarojs/components";
import {Button, Form, Input} from "@nutui/nutui-react-taro";
import {useRequest, useToast} from "taro-hooks";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {codeAxios, wechatAxios} from "../login-axios";
import {login} from "../../../store/userStore";
import Taro from "@tarojs/taro";
const defaultProps = {
    onOther: ()=>{ console.log("click Other")}
}
export const WechatLogin = (props)=>{


    const {onOther} = {...defaultProps,...props}
    const toast = useToast({

    })
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHttp = useRequest(
        param=>wechatAxios(param.code),
        {
            manual:true,
            retryCount:0,
            onSuccess:(data, params)=>{
                //200 成功
                console.log(data)
                // let data2 = data.data;
                if (data.data.code == 200){
                    dispatch(login(data.data.data))
                    Taro.setStorageSync("token",{
                        token:data.data.data.token,
                        expire:data.data.data.tokenExpire
                    })
                    Taro.setStorageSync("refreshToken",{
                        token:data.data.data.refreshToken,
                        expire:data.data.data.refreshTokenExpire
                    })
                    navigate(-1)
                }else {
                    toast.show({
                        title:data.data.msg,
                        icon:"error"
                    })
                }
            },
            onError:(err)=>{
                toast.show({
                    title:'网络错误',
                    icon:"error"
                })
            }
        }
    )

    const onLogin = (res)=>{
        // console.log(res)
        Taro.login({
            // @ts-ignore
            success: function (res) {
                console.log(res)
                //todo
                loginHttp.run(res)
            }
        })

    }
    return (
        <View className={'login-form'}>
            <OpenData type='userAvatarUrl'/>
            <Form className={'login-form-lable '}  starPosition={"right"}
                  onFinish={onLogin}
                  form={form}
                  footer={
                      <View className={'login-form-footer'}>
                          <Button onClick={()=>{form.submit()}}   className={'login-form-button-full'} type={'info'} block={true} shape={'square'}>登录</Button>
                          {/*<Button className={'login-form-button-full'} type={'primary'} block={true} fill={"outline"} shape={'square'}>注册</Button>*/}
                          <View className={'login-form-button-text'}>
                              {/*<View className={'login-form-button-text-right'}>忘记密码?</View>*/}
                          </View>
                          <View className={'login-form-button-other'} onClick={()=>onOther(2)}>其他方式</View>
                      </View>
                  }>
            </Form>
        </View>
    )
}