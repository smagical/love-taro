import React, {useEffect} from 'react'

import './index.scss'
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useNavigation, useRoutes} from "react-router-dom";
import {Main} from "../main/main";
import {Login} from "../login/login";
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/userStore";
import {Traffic} from "../module/traffic/traffic";
function Index() {
    const  token =   useSelector(getUserToken)

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(()=>{
        if (location.hash.startsWith("#/")){
            navigate(location.pathname,{replace:true})
            return;
        }
        if (location.pathname.startsWith("/pages")){
            navigate('/',{replace:true})
            return
        }

    })
    // useEffect(() => {
    //     if ((token == undefined || token == null) && !location.pathname.startsWith('/login')){
    //         navigate("/login",{
    //             replace:false
    //         })
    //     }
    // },[token] );

  return (
       <Routes>
          <Route path={'/'} element={<Main/>}></Route>
           <Route path={'/login/*'} element={<Login/>}></Route>
           <Route path={'/traffic'} element={<Traffic/>}></Route>
       </Routes>
  )
}

export default Index
