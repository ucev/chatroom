import React, { Component } from 'react';
import UserItem from './UserItem';

import MyAction from '../../state/action';

class Contacts extends Component {
  render() {
    var userid = this.props.userid;
    var users = this.props.users.filter((user) => {
      return user.id != userid;
    });
    var users = users.map((user) => {
      return (
        <UserItem key={user.id} user={user} />
      )
    })
    return (
      <div>
        <div>{users}</div>
      </div>
    );
  }
}

export default Contacts;
