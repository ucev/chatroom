import React, { Component } from 'react';

import PersonnelInfo from './PersonnelInfo';
import Login from './Login';

class User extends Component {
  render() {
    if (this.props.tag == 'info') {
      return (
        <PersonnelInfo key="personnel-info" avatar={this.props.avatar} nickname={this.props.nickname} />
      )
    } else {
      return (
        <Login tag={this.props.tag} />
      )
    }
  }
}

export default User;
