import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Avatar from './Avatar';
import '../css/UserItem.css';

import MyAction from '../../state/action';

class UserItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var user = this.props.user;
    return (
      <li className="user-item">
        <Link className="user-item-a" to={`/chat/${user.id}`}>
          <Avatar imgsrc={MyAction.getAvatarPath(user.avatar)} />
          <span className="user-item-nickname">{user.name}[{user.online == 1 ? '在线' : '下线'}]</span>
        </Link>
      </li>
    );
  }
}

export default UserItem;
