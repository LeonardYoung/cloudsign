export interface TaskDTO{
    course_cid ?: string;
    id ?: string;
    latitude ?: string;
    longitude ?: string;
    password ?: string; //手势密码
    time_limit ?: string;
    type ?: string; //发起签到类型 1限时签到 2 手势签到
}