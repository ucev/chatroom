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
    return (
      <li className="user-item" onClick = {this.startChat}>
        <Avatar imgsrc={this.props.avatar} />
        <span className="user-item-nickname">{this.props.nickname}</span>
      </li>
    );
  }
}

export default UserItem;
