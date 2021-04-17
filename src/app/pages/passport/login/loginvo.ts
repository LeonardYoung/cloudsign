export interface LoginVo{
    username?: string , //用户名
    password?: string, //密码

    phone?: string, //手机号码
    code?: string, //验证码

    type?:string,//类型，固定为1
}