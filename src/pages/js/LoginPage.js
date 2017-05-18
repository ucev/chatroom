import React from 'react';
import BasePage from './BasePage';
import '../css/LoginPage.css';

import MyAction from '../../state/action';

class Login extends BasePage {
  constructor(props) {
    super(props);
    this.state = { login: true };
    this.changeState = this.changeState.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  changeState() {
    this.setState((prevState) => {
      return Object.assign({ login: !prevState.login });
    })
  }
  confirm(e) {
    var username = this.usernameInput.value;
    var password = this.passwordInput.value;
    var that = this;
    if (this.state.login) {
      MyAction.login(username, password).then(() => {
        that.props.history.replace("/");
      }).catch(() => {
        console.log("login fail");
      })
    } else {
      MyAction.register(username, password).then(() => {
        that.changeState();
      }).catch(() => {
        console.log("error");
      })
    }
    e.preventDefault();
  }
  render() {
    var tags = {
      login: '登陆',
      register: '注册'
    };
    var curTag = this.state.login ? tags['login'] : tags['register'];
    var changeTag = this.state.login ? tags['register'] : tags['login'];
    return (
      <div className="App">
        <div className="App-body">
          <form className='login-form'>
            <legend className='login-form-title'>{curTag}</legend>
            <p className="login-form-line form-input-line">
              <label className="form-label login-label">用户名</label>
              <input ref={(input) => { this.usernameInput = input; }} className="form-input login-input" type="text" />
            </p>
            <p className="login-form-line form-input-line">
              <label className="form-label login-label">密码</label>
              <input ref={(input) => { this.passwordInput = input; }} className="form-input login-input" type="password" />
            </p>
            <p className="login-form-line form-button-line">
              <button className="login-change-state-button" type="button" onClick={this.changeState}>{changeTag}</button>
              <button className="login-confirm-button" type="button" onClick={this.confirm}>{curTag}</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
