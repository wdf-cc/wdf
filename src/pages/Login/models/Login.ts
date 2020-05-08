import { Response } from "../../../models/Network";

export class AddStudent {
    public studentName: string = "";
    public telephone: string = "18000000000";    // default null
    public grade: string = "";
    public studyTime: number = -1;
    public schoolId: string = "";
    public confirm: string ="";
}

export interface SchoolLogo {
    id: string;
    logoUrl: string;
    schoolName: string;
}

export interface DictList {
    dictName: string ;
    dictCode: string ;
}

export class LoginState {
    logoUrl: string = "";    //logo的URL
    //count: number = 300;   //倒计时
    grades: DictList[] = []; //年级
    studyTimes: DictList[] = []; //时长
    alertContent:string = "";
    alertShow:boolean = false;
}

