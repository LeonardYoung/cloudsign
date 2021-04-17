export interface signupVO{
    phone?: string, //手机号
    identity?: string,//学工号
    msgcode?: string,//验证码
    password?: string,
    username?: string,
    type?: string, //用户类型：学生、老师
    email?: string,
}