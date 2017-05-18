import React from 'react';
import BasePage from './BasePage';
import {
  Redirect
} from 'react-router-dom';

import '../css/AvatarPage.css';

import MyAction from '../../state/action';

class AvatarPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.back = this.back.bind(this);
    this.chooseAvatar = this.chooseAvatar.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    MyAction.getUserInfo();
  }
  back() {
    this.props.history.goBack();
  }
  chooseAvatar() {
    this.avatarInput.click();
  }
  uploadAvatar(e) {
    MyAction.uploadAvatar(this.avatarInput.files[0]);
  }
  render() {
    if (!MyAction.userCheck()) {
      return <Redirect to = '/login' />;
    }
    var avatar = this.state.avatar;
    return (
      <div className="App avatar-page">
        <div className="App-header avatar-header">
          <img className="back-arrow" src="/images/ic_arrow_back_white_36dp_2x.png" onClick={this.back} />
          <img className="avatar-choose-photo" src="/images/ic_photo_white_36dp_2x.png" onClick={this.chooseAvatar} />
        </div>
        <div className="App-body avatar-body">
          <img className="avatar-page-img" src={MyAction.getAvatarPath(avatar)} />
          <input onChange={this.uploadAvatar} ref={(avatar) => { this.avatarInput = avatar; }} type="file" accept="image/*" style={{ display: "none" }} />
        </div>
      </div>
    )
  }
}

export default AvatarPage;
