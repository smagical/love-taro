import './login.scss'
import {View} from "@tarojs/components";
import {useDispatch, useSelector} from "react-redux";
import {getUserToken, login, setToken} from '../../store/userStore'
import {ActionSheet, Button, Form, FormItem, Input, Row} from "@nutui/nutui-react-taro";
import {useEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {UsernameLogin} from "./form/username";
import {CodeLogin} from "./form/code";
import {WechatLogin} from "./form/wechat";
import Taro from "@tarojs/taro";
import {useEnv, useRequest} from "taro-hooks";
import {refreshTokenAxios} from  './login-axios'
export const Login = () => {
    const dispatch =  useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const userToken = useSelector(getUserToken);
    const env = useEnv()
    console.log('login')

    const tryLoginRequest = useRequest(
        param=>refreshTokenAxios(param),
        {
            manual:true,
            retryCount:2,
            onSuccess:(data, params)=>{
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
                }
            }
        }
    )

    const tryLogin = ()=>{
        // console.log(userToken)
        //todo 待测试
        if (userToken ) {
            navigate(-1)
            return;
        }


        const  token = Taro.getStorageSync("token")
        const  refreshToken = Taro.getStorageSync("refreshToken")
        if (token && token.expire < Date.now().valueOf()){
            dispatch(login({token:token.token,refreshToken:refreshToken.token}))
            navigate(-1)
            return
        }
        if (refreshToken && refreshToken.expire < Date.now().valueOf()){
            tryLoginRequest.run(refreshToken.token)
        }

    }

    useEffect(()=>{
        tryLogin()
    })

    const optionsOne= [
        {
            name: 'code登录',
            id:1,
            path:'code'
        },
        {
            name: '用户名密码',
            id:0,
            path:'username'
        },
        {
            name: '微信登录',
            id:2,
            path:'wechat'
        },
    ];

    const [otherVisivle,setOtherVisivle] = useState(false);
    const [otherOption,setOtherOption] = useState([])

    const openOther = (id = 0)=>{

        setOtherOption(optionsOne.filter(e=>e.id!=id).filter(
            e=>
                !(env != 'WEAPP' && e.id == 2)

        ))
        setOtherVisivle(true)
    }
    const chooseOther = (res)=>{
      //  console.log(res)
        navigate(res.path,{replace:true})
        setOtherVisivle(false)
    }
    return (
        <View className={'login'}>
            <View className={'login-card'}>
                <Row className={'login-title'}>
                    登录
                </Row>
                <Row className={'login-content'}>
                    <Routes >
                        <Route path={'username'} element={<UsernameLogin onOther={openOther} />}></Route>
                        <Route path={'code'} element={<CodeLogin onOther={openOther}/>}></Route>
                        <Route path={'wechat'} element={<WechatLogin onOther={openOther}/>}></Route>
                        {
                           env == 'WEAPP' ?
                               <Route path={'*'} element={<WechatLogin onOther={openOther}/> }></Route>
                               :
                            <Route path={'*'} element={<UsernameLogin onOther={openOther}/> }></Route>
                        }
                    </Routes>
                </Row>
            </View>
            <ActionSheet
                visible={otherVisivle}
                options={otherOption}
                onSelect={(item) => {chooseOther(item)}}
                onCancel={() => setOtherVisivle(false)}
                className={'login-other'}
            />
        </View>
    );
};