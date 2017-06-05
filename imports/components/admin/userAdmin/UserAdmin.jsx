import React from 'react';
import ReactDOM from 'react-dom';
import { Cities } from './../../../collections/cities/cities';
import SystemAdmin from "./SystemAdmin";
import EmployeeAdmin from "./EmployeeAdmin";
import ClientAdmin from "./ClientAdmin";
import "./userAdmin.less";

export default class UserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeName: "client",
    };
  }

  renderUserTypeOption(){
    var userType = [
      {_id: 1, typeName: "client", typeTitle: "客戶"},
      {_id: 2, typeName: "admin", typeTitle: "管理者"},
      {_id: 3, typeName: "employee", typeTitle: "員工"}
    ];

    var currentUserType = this.state.typeName;

    var userTypeOutput = userType.map(function(type){
      if(type.typeName == currentUserType){
        return (
          <div key={type._id} className="userType selected">
            {type.typeTitle}
          </div>
        );
      }else{
        return (
          <div key={type._id} className="userType" onClick={()=>this.selectUserType(type)}>
            {type.typeTitle}
          </div>
        );
      };
    }.bind(this));

    return userTypeOutput;
  }

  selectUserType(type){
    this.setState({typeName: type.typeName});
    return false;
  }

  renderUserDataColumn(){
    if(this.state.typeName == "client"){
      return (
        <div className="userDataBlock">
          <ClientAdmin/>
        </div>
      );
    }else if(this.state.typeName == "admin"){
      return (
        <div className="userDataBlock">
          <SystemAdmin/>
        </div>
      );
    }else{
      return (
        <div className="userDataBlock">
          <EmployeeAdmin/>
        </div>
      );
    };
  }

  addUser(){
    var email = $('#email').val();
    var password = $('#password').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var phoneNumber = $('#phoneNumber').val();
    var gender = $('#gender').val();

    console.log(email, password, firstName, lastName, phoneNumber, gender);
  }

  render() {
    return (
      <div id="userAdmin">
        <div id="userType" className="row">
          <div className="userTypeBlock">
            {this.renderUserTypeOption()}
          </div>
        </div>
          {this.renderUserDataColumn()}
      </div>
    );
  }
}
