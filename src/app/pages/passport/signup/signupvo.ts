export interface signupVO{
    idNumber?: string,//学工号
    password?: string,
    phone?: string, //手机号
    smsCode?: string,//验证码
    type?: string, //用户类型：学生、老师
    username?: string,
}