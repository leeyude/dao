import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import "./accountHandling.less";

export default class HandleAccount extends React.Component {
  constructor(props) {
    super(props);

    if(this.props.accountAction == 'signup'){
      var componentText = {
        type: "signup",
        mainText: "註冊",
      };

    }else if (this.props.accountAction == 'login') {
      var componentText = {
        type: "login",
        mainText: "登入",
      };
    };

    this.state = {
      componentText: componentText,
      logInError: "hidden",
      rememberMe: "rememberMe",
    };
  }

  loginFunctions(){
    if(this.props.accountAction == 'login'){
      return (
        <div className="form-group">
          <div className="row">
            <div className="col-xs-6">
              <div onClick={this.rememberMe.bind(this)} className={this.state.rememberMe}>
              </div>
              <p>記住我</p>
            </div>
            <div className="col-xs-6 text-right">
              <a onClick={this.passwordReset} data-toggle="modal" data-target="#exampleModal" className="login-forgot-password" href="">忘記密碼？</a>
            </div>
          </div>
        </div>
      );
    }
  }

  rememberMe(e){
    e.preventDefault();
    if(this.state.rememberMe == "rememberMe"){
      this.setState( { rememberMe:'fa fa-check rememberMeChecked'} );
    }else{
      this.setState( { rememberMe:'rememberMe'} );
    };

    return false;
  }

  clickToHandleAccount(e){
    e.preventDefault();
    var isLogin = this.props.accountAction == 'login';
    if(isLogin){// this is a login session.
      var userToLogin = {
        email: $('.email_input').val(),
        password: $('.password_input').val(),
        rememberMeChecked: this.state.rememberMe
      };

      Meteor.loginWithPassword(userToLogin.email, userToLogin.password, function(error){
        if(error){
          console.log(error);
        }
      });

    }else{// this is a signup session.
      var userToSignup = {
        email: $('.email_input').val(),
        password: $('.password_input').val(),
      };

      Accounts.createUser({
        email: userToSignup.email,
        password: userToSignup.password,
        profile: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          district: '',
          phone: '',
          birthday: {
            year: '',
            month: '',
            day: '',
          },
          gender: '',
        },
      });
    };


    // var rememberMeChecked = this.state.rememberMe;
    //
    // if(rememberMeChecked=="fa fa-check rememberMeChecked"){
    //   // user requested "remember me."
    //   Meteor.loginWithPassword(email, password, function(error, result){
    //     if(error){
    //       this.setState( { logInError:'error'} );
    //
    //     }else{
    //       this.setState( { logInError:'hidden'} );
    //       FlowRouter.go("/user_test");
    //     }
    //   }.bind(this));
    //
    // }else{
    //   // user would drop token if session finished.
    //   Meteor.loginWithPassword(email, password, function(error, result){
    //     if(error){
    //       this.setState( { logInError:'error'} );
    //
    //     }else{
    //       this.setState( { logInError:'hidden'} );
    //       // remove client storage of login data
    //       Accounts._unstoreLoginToken();
    //       Accounts._autoLoginEnabled = false;
    //       FlowRouter.go("/user_test");
    //     }
    //   }.bind(this));
    // };

  }

  render() {
    return (
      <div>
        <div id="login">
          <div className="container">
             <div className="row">
               <div className="col-sm-6 col-md-5 col-lg-4 col-center">
                 <div className="login-group">
                  <h2>{this.state.componentText.mainText}</h2>
                  <form>
                    <div className="form-group">
                      <label className="form-label">電子信箱 E-mail</label>
                      <input type="text" placeholder="Email" ref="email" className="form-control email_input"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">密碼 Password</label>
                      <input type="password" placeholder="Password" ref="password" className="form-control password_input"/>
                    </div>

                    {this.loginFunctions()}

                    <p className={this.state.logInError}>帳號密碼輸入有誤，請重新輸入</p>

                    <div className="form-group">
                      <button type="submit" onClick={this.clickToHandleAccount.bind(this)} className="btn btnGrad btn-md btn-success">{this.state.componentText.mainText}</button>
                    </div>

                    <div className="form-divider">

                    </div>

                  </form>
                 </div>
               </div>
             </div>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
