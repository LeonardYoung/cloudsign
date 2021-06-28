export interface LoginVo{
    username?: string , //用户名
    password?: string, //密码

    phone?: string, //手机号码
    code?: string, //验证码

    uuid?: string,//图形ID
    picCode?: string,//图形ID验证码

    type?:string,//登录类型:1 用户名密码, 2 短信验证码
}