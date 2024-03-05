
const baseUrl = "http://127.0.0.1:3000/mock/18"
const base = {
    login:baseUrl+'/login',
    traffic:baseUrl+'/traffic'
}
export const Api = {
    login:{

        codeApi:base.login+'/code',
        usernameApi:base.login+'/username',
        wechatApi:base.login+'/wechat',
        refreshTokenApi:base.login+'/refreshToken'
    },
    traffic:{
        uploadApi:base.traffic+'/upload',
        searchApi:base.traffic+'/search',
        notFoundApi:base.traffic+'/notfound'
    }
}