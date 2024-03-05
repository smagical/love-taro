
import './navigation.scss'
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {Col, NavBar, Row} from "@nutui/nutui-react-taro";
import {ArrowLeft, Home} from "@nutui/icons-react-taro";
import {useNavigate} from "react-router-dom";
const defaultProps = {
    title:'标题',
    className:'',
    left:false,
    home:false

}
export const NavigationBar = (props)=>{
    const {title,className,left,home} = {...defaultProps,...props}

    const systemInfo = Taro.getSystemInfoSync();
    console.log(systemInfo)
    const statusBar = isNaN(systemInfo.statusBarHeight) ? 0 : systemInfo.statusBarHeight
    const navBarTitleHeight = (systemInfo.platform == 'ios' ||systemInfo.platform == 'devtools' ) ? 40 : 48
     const navBarHeight = statusBar + navBarTitleHeight

    const navigator = useNavigate()

    const backDom = ()=>{
        if (!left) return (<></>)
        return (
            <ArrowLeft color={'white'} size={20}/>
        )
    }
    const homeDom = ()=>{
        if (!home) return (<></>)
        return (
            <Home  color={'white'} onClick={()=>{navigator("/")}} size={20}/>
        )
    }

    return (
        <View className={'navigation '+className} style={{
            height: navBarHeight + 'px'
        }} >
            <View style={{height: statusBar + 'px'}} className={'navigation-status'}></View>
            <View style={{height: navBarTitleHeight+'px'}} className={'navigation-title'}>
                {/*{   (left || home) &&*/}
                {/*    <View className={'navigation-title-left'}>*/}
                {/*        <Row gutter={5}>*/}
                {/*            {   left &&*/}
                {/*                <Col span={10}>*/}
                {/*                    <ArrowLeft size={30}/>*/}
                {/*                </Col>*/}
                {/*            }*/}

                {/*            {   home &&*/}
                {/*                <Col span={10}>*/}
                {/*                    <Home  size={30}/>*/}
                {/*                </Col>*/}
                {/*            }*/}
                {/*        </Row>*/}

                {/*    </View>*/}
                {/*}*/}
                {/*    <View className={'navigation-title-center'}>{title}</View>*/}
                <NavBar
                        className={'navigation-title-nav'}
                        back={backDom()}
                        left={homeDom()}
                        onBackClick={()=>{
                            navigator(-1)
                        }}
                >
                    <View className={'navigation-title-center'}>
                        {title}
                    </View>
                </NavBar>
            </View>
        </View>
    )
}