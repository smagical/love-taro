import {configureStore} from "@reduxjs/toolkit";
import userStore from "./userStore";


const store = configureStore({
    reducer:{
        user:userStore
    }
})

export default store;