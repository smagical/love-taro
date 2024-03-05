import './main.scss'
import {View} from "@tarojs/components";
import {Grid, GridItem, Image, Loading} from "@nutui/nutui-react-taro";
import {useNavigate} from "react-router-dom";

export const Main = ()=>{

    const navigate = useNavigate();
    console.log("main")
    // console.log(location)
    const grid = [
        {
        url:'/traffic',
        image:"https://cdn.jsdelivr.net/gh/ssaltedfish/image/weixin/91470579_p0.png",
        title:'学法减分'
        },
        // {
        //     url:'',
        //     image:"https://cdn.jsdelivr.net/gh/ssaltedfish/image/weixin/91470579_p0.png",
        //     title:'2'
        // }
    ]

    const goFunction = (res)=>{
        console.log(res)
        navigate(res)
    }

    return (
        <View className={'main'}>
            <Grid className={'main-grid'} columns={2} gap={10} center={true}>
                {
                    grid.map(e=>{
                        return (
                            <Grid.Item className={'main-grid-item'} onClick={event=>goFunction(e.url)}>
                                <View className={'main-grid-item-view'}>
                                    <Image src={e.image}
                                           loading={<Loading className="nut-icon-loading" />}
                                           mode={'scaleToFill'}
                                           className={'main-grid-item-image'}
                                    />
                                </View>
                                {e.title}
                            </Grid.Item>
                        )
                    })
                }
            </Grid>
        </View>
    )
}