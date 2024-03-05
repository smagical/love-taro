import './traffic.scss'
import {View} from "@tarojs/components";
import {NavigationBar} from "../../../component/navigation/navigation";
import {Button, Cell, CellGroup, Col, Image, Popup, Row, SearchBar} from "@nutui/nutui-react-taro";
import {useState} from "react";
import {useRequest, useToast} from "taro-hooks";

import {notFoundAxios, searchAxios, uploadSearchAxios} from './traffic-axios'
import Taro from "@tarojs/taro";
import {FaceAngry} from "@nutui/icons-react-taro";

export const Traffic = ()=>{

    const az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [popupVisible,setPopupVisible] = useState(false)
    const toast = useToast({})

    const [answer,setAnswer] = useState([])
    const [imageId,setImageId] = useState()


    const searchRequest = useRequest(
        param=>searchAxios(param),
        {
            manual:true,
            onSuccess: (data, params) => {
                // console.log(data.data.code)
                // let data = JSON.parse(data1.data)
                if (data.data.code == 200){
                    setAnswer(data.data.data)
                    setPopupVisible(true)

                }else {
                    toast.show({
                        icon:'error',
                        title: data.data.msg
                    })
                }
            }
        }
    )

    const searchKey = (key)=>{
        searchRequest.run(key)
    }

    const uploadSearch = () =>{
        Taro.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
     //           console.log(res)

                uploadSearchAxios(res.tempFilePaths[0])
                    .then(res=>{
                      //  console.log(res)
                        if (res.statusCode  != 200){
                            toast.show({
                                icon:'error',
                                title: '网络错误'
                            })
                        }
                        let data = JSON.parse(res.data);
                        if (data.code != 200){
                            toast.show({
                                icon:'error',
                                title: data.msg
                            })
                        }
                        setImageId(data.data.id)
                        setAnswer(data.data.answer)
                        setPopupVisible(true)

                    })
                    .catch(error=>{

                        toast.show({
                            icon:'error',
                            title: '网络错误'
                        })
                    })
            }
        })
    }

    const notFoundRequest = useRequest(
        param=>notFoundAxios(param),
        {
            manual:true,
            onSuccess: (data, params) => {
                // console.log(data.data.code)
                // let data = JSON.parse(data1.data)
                if (data.data.code == 200){
                    setAnswer([])
                    setPopupVisible(false)
                    setImageId(null)
                    toast.show({
                        icon:'success',
                        title: '上报成功'
                    })
                }else {
                    toast.show({
                        icon:'error',
                        title: data.data.msg
                    })
                }
            }
        }
    )

    const  notFound = ()=> {
        if (imageId == null || imageId ==undefined|| imageId.length <= 0) return;
        notFoundRequest.run(imageId)
    }

    return (
        <View  className={'traffic'}>
            <NavigationBar left={true} home={true} title={'学法减分'} />
            <View>
                <SearchBar placeholder={'请输入题目'} maxLength={20} onSearch={
                    key=> searchKey(key)
                }></SearchBar>
                <Row gutter={2} className={'traffic-content'}>
                    <Col span={12} >
                        <Cell onClick={()=> uploadSearch()}>
                            <View  className={'traffic-content-upload'} >
                                上传照片
                            </View>
                        </Cell>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Cell>
                                    <View className={'traffic-content-upload'}>
                                        上传照片
                                    </View>
                                </Cell>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </View>
            <Popup className={'traffic-popup'}
                   position={'bottom'}
                   round={true}
                   visible={popupVisible}
                   onClose={()=>setPopupVisible(false)}
                   onOverlayClick={()=>setPopupVisible(false)}
            >
                <CellGroup>
                    {
                        answer.map((item,index)=>{
                            return (
                                <Cell>
                                    <View>
                                        <View className={'traffic-popup-title'}>{(index+1)+'.'+item.title}</View>
                                        {
                                            item.image != '' &&
                                            <View className={'traffic-popup-title'}>
                                                <Image width={200} height={100} src={item.image}/>
                                            </View>
                                        }
                                        {
                                            item.data.map((it,index)=>{
                                                return (
                                                    <View>{az.at(index) +': ' +it}</View>
                                                )
                                            })
                                        }
                                    </View>
                                </Cell>
                            )
                        })
                    }
                </CellGroup>
                {
                    imageId &&

                    <View className={'traffic-popup-toolbar'}>
                        <Button icon={<FaceAngry size={20}/>} onClick={()=>notFound()} rightIcon={<FaceAngry size={20}/>} fill={'dashed'} type={'primary'} >找不到该题</Button>
                    </View>
                }
            </Popup>
        </View>
    )
}