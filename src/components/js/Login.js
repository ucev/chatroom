import React, { Component } from 'react';
import '../css/Login.css';

import MyAction from '../../state/action';

class Login extends Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.confirm  = this.confirm.bind(this);
  }
  changeState(e) {
    var newState = this.props.tag === 'login' ? 'register' : 'login';
    MyAction.changeLoginState(newState);
    e.preventDefault();
  }
  confirm(e) {
    var username = this.usernameInput.value;
    var password = this.passwordInput.value;
    if (this.props.tag === 'login') {
      MyAction.login(username, password);
    } else {
      MyAction.register(username, password);
    }
    e.preventDefault();
  }
  render() {
    var tags = {
      login: '登陆',
      register: '注册'
    };
    var changeTag = this.props.tag === 'login' ? 'register' : 'login';
    return (
      <form className='login-form'>
        <legend>{tags[this.props.tag]}</legend>
        <p className="login-form-line form-input-line">
          <label className="form-label login-label">用户名</label>
          <input ref={(input) => {this.usernameInput=input;}} className="form-input login-input" type="text" />
        </p>
        <p className="login-form-line form-input-line">
          <label className="form-label login-label">密码</label>
          <input ref={(input)=>{this.passwordInput=input;}} className="form-input login-input" type="password" />
        </p>
        <p className="login-form-line form-button-line">
          <button className="login-change-state-button" type="button" onClick={this.changeState}>{tags[changeTag]}</button>
          <button className="login-confirm-button" type="button" onClick={this.confirm}>{tags[this.props.tag]}</button>
        </p>
      </form>
    );
  }
}

export default Login;
