import React, { Component } from 'react';
import Avatar from './Avatar';
import '../css/UserItem.css';

import MyAction from '../../state/action';

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.startChat = this.startChat.bind(this);
  }
  startChat() {
    MyAction.startChat(this.props.id);
  }
  render() {
    var user = this.props.user;
    return (
      <li className="user-item" onClick = {this.startChat}>
        <Avatar imgsrc={MyAction.getAvatarPath(user.avatar)} />
        <span className="user-item-nickname">{user.name}[{user.online==1?'在线':'下线'}]</span>
      </li>
    );
  }
}

export default UserItem;
