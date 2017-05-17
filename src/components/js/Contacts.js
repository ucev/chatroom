import React, { Component } from 'react';
import UserItem from './UserItem';

import MyAction from '../../state/action';

class Contacts extends Component {
  render() {
    var state = MyAction.getState();
    var userid = state.userid;
    var users = state.users.filter((user) => {
      return user.id != userid;
    });
    var users = users.map((user) => {
      return (
        <UserItem key={user.id} user={user} history={this.props.history} />
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
