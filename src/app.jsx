import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.scss'

import store from '@/store/index'
import {Provider} from "react-redux";
import axios from "axios";

axios.defaults.baseURL = process.env.TARO_APP_API_HOST
axios.defaults.withCredentials = true

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {

  })

  // 对应 onHide
  useDidHide(() => {})

  return (
      <Provider store={store}>
        {/* props.children 是将要被渲染的页面 */}
        {props.children}
      </Provider>
  )
}

export default App
