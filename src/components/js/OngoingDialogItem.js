import React, { Component } from 'react';
import Avatar from './Avatar';
import '../css/OngoingDialogItem.css';

class OngoingDialogItem extends Component {
  render() {
    return (
      <li className="ongoing-dialog-item">
        <Avatar imgsrc={this.props.avatar} />
        <span className="ongoing-dialog-nickname">{this.props.nickname}</span>
        <span className="ongoing-dialog-datetime">{this.props.datetime}</span>
        <span className="ongoing-dialog-conversation">{this.props.conversation}</span>
      </li>
    );
  }
}

export default OngoingDialogItem;
