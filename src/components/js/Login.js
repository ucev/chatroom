import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
  render() {
    return (
      <form id='login-form'>
        <p><label className="form-label login-label">用户名</label><input className="form-input login-input" type="text" /></p>
        <p><label className="form-label login-label">密码</label><input className="form-input login-input" type="text" /></p>
      </form>
    );
  }
}

export default Login;
