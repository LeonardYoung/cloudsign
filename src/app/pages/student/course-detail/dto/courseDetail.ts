export interface CourseDetail {
    cid ?: string;
    coursename?: string;
    detailinfo?:string;

    enabled?:boolean;

    school_code?:string;
    college_code?:string;
    major_code?:string;

    teacher_tid?:string;


    school_name?:string;
    college_name?:string;
    major_name?:string;
    teacher_name?:string;
}