import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./header.less";
import HandleAccount from './../user/accountHandling/AccountHandling';
import Homepage from './../pages/homepage/Homepage';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.accountAction){
      this.state = {
        accountAction: this.props.accountAction,
      };
    }else{
      this.state = {
        accountAction: false,
      };
    }
  }

  getLinks() {
    return [
//      {_id: 1, href: '/ourServices', text: '服務簡介'},
//      {_id: 2, href: '/howItWorks', text: ''},
    ];
  }

  getNavTitles() {
    return this.getLinks().map(function(link){
      return (
        <li key={link._id}>
          <a className="navItem navComponent" href={link.href}> {link.text}</a>
        </li>
      )
    });
  }

  clickHeaderLogo(e){
    e.preventDefault();
    this.setState({
      accountAction: false,
    });
  }

  clickHeaderSignup(e){
    e.preventDefault();
    this.setState({
      accountAction: "signup",
    });
  }

  clickHeaderLogin(e){
    e.preventDefault();
    this.setState({
      accountAction: "login",
    });
  }

  renderLoginAndSignup(){
    if(!this.state.accountAction){
      return (
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            {this.getNavTitles()}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <div className="signup" onClick={this.clickHeaderSignup.bind(this)}>
                <Link to="/signup">註冊</Link>
              </div>
              <div className="login" onClick={this.clickHeaderLogin.bind(this)}>
                <Link to="/login">登入</Link>
              </div>
            </li>
          </ul>
        </div>
      )
    }
  }

  render(){
    return (
    <Router>
      <div>
        <nav className="navbar navbar-default navbar-fixed-top clearfix" id="mainHeader">
          <div className="container-fluid navHolder">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div id="logo" onClick={this.clickHeaderLogo.bind(this)}>
                <Link to="/"><img src="/images/dao_logo.png" alt="dao"/></Link>
              </div>
            </div>

            {this.renderLoginAndSignup()}

          </div>
        </nav>

        <Route exact path="/" component={Homepage}/>
        <Route path="/signup" component={() => (<HandleAccount accountAction={this.state.accountAction}/>)}/>
        <Route path="/login" component={() => (<HandleAccount accountAction={this.state.accountAction}/>)}/>

      </div>
    </Router>
    )
  }
};
