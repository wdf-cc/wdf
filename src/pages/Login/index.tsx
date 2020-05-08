import React, { Component } from 'react';
import {Col,Form,Button,Alert} from 'react-bootstrap';
import { LoginState, AddStudent, DictList, SchoolLogo } from './models/Login';
import { Path} from '../../models/Network';
import { ajax } from 'rxjs/ajax';
import './index.css';


export default class Login extends Component<any>{
  public state: LoginState;
  public addStudent: AddStudent;
  //private logoURL: string;

  constructor(props: any) {
    super(props);
    this.state = new LoginState();
    this.addStudent = new AddStudent();
  }

  componentDidMount() {
    ajax(Path.getSchoolLogo()).subscribe(res => {
      if (res.response.code === "0000") {
        var logoURL = (res.response.result.logoUrl as string);
        this.setState({ logoUrl: logoURL });
      }
    });
    ajax(Path.getDictListNJ).subscribe(res => {
      if (res.response.code === "0000") {
        var dictListNJ = (res.response.result as DictList[]);
        this.setState({ grades: dictListNJ });
      }
    })
    ajax(Path.getDictListXXSC).subscribe(res => {
      if (res.response.code === "0000") {
        var dictListXXSC = (res.response.result as DictList[]);
        this.setState({ studyTimes: dictListXXSC });
      }
    })

  }

  onLogin(e:any): void {
    //console.log(this.addStudent);
    var chinese = /^[\u2E80-\u9FFF]{2,4}$/.test(this.addStudent.studentName);
    if(this.addStudent.studentName==="" || this.addStudent.grade==="" || this.addStudent.studyTime===-1){
      this.setState({alertShow:true,alertContent:"有未输入的内容"});
      return;
    }
    if(!chinese){
      this.setState({alertShow:true,alertContent:"请输入中文姓名"}); 
      return;
    }
    //ajax() 
    /*init work*/
  }

  setStudentName(event:any){
      this.addStudent.studentName = event.target.value;
      if(this.state.alertShow){
        this.setState({alertShow:false,alertContent:""});
      }
  }

  setGrade(event:any){
      this.addStudent.grade = event.target.value;
      if(this.state.alertShow){
        this.setState({alertShow:false,alertContent:""});
      }
  }

  setStudyTime(event:any){
      this.addStudent.studyTime = event.target.value;
      if(this.state.alertShow){
        this.setState({alertShow:false,alertContent:""});
      }
  }

  render(){
    var grades = this.state.grades.map((grade, index) => {
      return <option value={grade.dictCode} key={`grade${index}`}>{grade.dictName}</option>;
    });

    var studyTimes = this.state.studyTimes.map((studyTime, index) => {
      return <option value={studyTime.dictCode} key={`studyTime${index}`}>{studyTime.dictName}</option>;
    });

    var alertElement;
    if(this.state.alertShow){
      alertElement = <Alert variant="danger">{this.state.alertContent}</Alert>
    }

    return (
      <div>
          <Col xs={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} className="text-center top10">
            <img src={this.state.logoUrl} alt="" className="" />
          </Col>
          <Col xs={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
            <Form.Group>
              <Form.Label>姓名</Form.Label>
              <Form.Control type="text" placeholder="请输入中文姓名" size="lg" id="userName" onChange={this.setStudentName.bind(this)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>请选择年级</Form.Label>
              <Form.Control as="select" onChange={this.setGrade.bind(this)}>
                {grades}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label>请选择时长</Form.Label>
              <Form.Control as="select" onChange={this.setStudyTime.bind(this)}>
                {studyTimes}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
            {alertElement}
          </Col> 
        <Col xs={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
          <Button block className="" variant="danger" onClick={this.onLogin.bind(this)}>确认</Button>
        </Col>  
      </div>
    );
  }
}