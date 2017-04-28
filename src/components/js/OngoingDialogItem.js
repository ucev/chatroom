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
    return (
      <li className="ongoing-dialog-item" onClick={this.startChat}>
        <Avatar imgsrc={this.props.avatar} />
        <span className="ongoing-dialog-nickname">{this.props.nickname}</span>
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
