import React, { Component } from 'react';
import MyAction from '../../state/action';

import '../css/PersonnelInfo.css';

class PersonnelInfo extends Component {
  constructor(props) {
    super(props);
    this.chooseAvatar = this.chooseAvatar.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }
  changeNickname() {
    MyAction.pageAdd("nickname_page");
  }
  chooseAvatar() {
    //this.avatarInput.click();
    MyAction.pageAdd("avatar_page");
  }
  logout() {
    MyAction.logout();
  }
  uploadAvatar(e) {
    MyAction.uploadAvatar(this.avatarInput.files[0]);
  }
  render() {
    return (
      <div className="personnel-info-div">
        <div className="personnel-info-item-div" onClick={this.chooseAvatar}>
          <label className="personnel-info-item-label">头像</label>
          <img className="personnel-info-item-content" src={MyAction.getAvatarPath(this.props.avatar)} />
        </div>
        <div className="personnel-info-item-div" onClick={this.changeNickname}>
          <label className="personnel-info-item-label">昵称</label>
          <span className="personnel-info-item-content">{this.props.nickname}</span>
        </div>
        <button className="logout-button" onClick={this.logout}>退出登录</button>
        <input onChange={this.uploadAvatar} ref={(avatar) => { this.avatarInput = avatar; }} type="file" accept="image/*" style={{display: "none"}}/>
      </div>
    )
  }
}

export default PersonnelInfo;
