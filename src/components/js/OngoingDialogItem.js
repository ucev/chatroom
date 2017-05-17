import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Avatar from './Avatar';
import '../css/OngoingDialogItem.css';

import MyAction from '../../state/action';

class OngoingDialogItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var user = this.props.user;
    return (
      <li className="ongoing-dialog-item" >
        <Link className="ongoing-dialog-item-a" to={`/chat/${this.props.toid}`}>
          <Avatar imgsrc={MyAction.getAvatarPath(user.avatar)} />
          <span className="ongoing-dialog-nickname">{user.name}</span>
          <span className="ongoing-dialog-datetime">{this.props.datetime}</span>
          <span className="ongoing-dialog-content">{this.props.content}</span>
          {this.props.unread > 0 &&
            <span className="ongoing-dialog-unread">{this.props.unread}</span>
          }
        </Link>
      </li>
    );
  }
}

export default OngoingDialogItem;
