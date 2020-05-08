import {getSearch} from '../utils/getSearch';

 export class Path {
    public static baseURL:string = "http://118.178.92.24:7115";
    public static getSchoolLogo:Function = function (){
        var schoolIdVal:string = getSearch("schoolId");
        return `${Path.baseURL}/exam/dict/getSchoolLogo?schoolId=${schoolIdVal}`; 
    };
    private static getDictList:string = `${Path.baseURL}/exam/dict/getDictList?type=`;
    public static getDictListNJ:string = `${Path.getDictList}NJ`;
    public static getDictListXXSC:string = `${Path.getDictList}XXSC`;
    public static addStudent:string = `${Path.baseURL}/exam/student/addStudent`;
    public static getExamList:Function = function (studentId:string):string{
        return `${Path.baseURL}/exam/student/getExamList?studentId=${studentId}`;
    }
} 

export class Response<T>{
    code:string = "";
    description:string = "";
    result:T|null = null;
} 