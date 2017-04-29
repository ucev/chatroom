import React, { Component } from 'react';
import Avatar from './Avatar';
import '../css/OngoingDialogItem.css';

import MyAction from '../../state/action';

class OngoingDialogItem extends Component {
  constructor(props) {
    super(props);
    this.startChat = this.startChat.bind(this);
  }
  startChat() {
    MyAction.startChat(this.props.toid);
  }
  render() {
    var user = this.props.user;
    return (
      <li className="ongoing-dialog-item" onClick={this.startChat}>
        <Avatar imgsrc={MyAction.getAvatarPath(user.avatar)} />
        <span className="ongoing-dialog-nickname">{user.name}</span>
        <span className="ongoing-dialog-datetime">{this.props.datetime}</span>
        <span className="ongoing-dialog-content">{this.props.content}</span>
        {this.props.unread > 0 &&
          <span className="ongoing-dialog-unread">{this.props.unread}</span>
        }
      </li>
    );
  }
}

export default OngoingDialogItem;
