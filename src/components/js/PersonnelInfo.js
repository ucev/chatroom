import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import MyAction from '../../state/action';

import '../css/PersonnelInfo.css';

class PersonnelInfo extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    MyAction.logout().then(() => {
      this.props.history.replace('/');
    })
  }
  render() {
    var state = MyAction.getState();
    var avatar = state.avatar;
    var nickname = state.nickname;
    return ( 
      <div className="personnel-info-div">
        <Link className="personnel-info-item-div" to={`/avatar`}>
          <label className="personnel-info-item-label">头像</label>
          <img className="personnel-info-item-content" src={MyAction.getAvatarPath(avatar)} />
        </Link>
        <Link className="personnel-info-item-div" to={`/nickname`}>
          <label className="personnel-info-item-label">昵称</label>
          <span className="personnel-info-item-content">{nickname}</span>
        </Link>
        <button className="logout-button" onClick={this.logout}>退出登录</button>
        <input onChange={this.uploadAvatar} ref={(avatar) => { this.avatarInput = avatar; }} type="file" accept="image/*" style={{display: "none"}}/>
      </div>
    )
  }
}

export default PersonnelInfo;
