import React from 'react';
import BasePage from './BasePage';
import {
  Redirect,
  Route
} from 'react-router-dom';
import ImageCropper from 'imagecropper';

import '../css/AvatarPage.css';
import 'imagecropper/src/css/image-cropper.css';

import MyAction from '../../state/action';

class AvatarPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.back = this.back.bind(this);
    this.chooseAvatar = this.chooseAvatar.bind(this);
    this.goSetAvatar = this.goSetAvatar.bind(this);
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
  goSetAvatar(e) {
    var that = this;
    var fr = new FileReader();
    fr.readAsDataURL(this.avatarInput.files[0]);
    fr.onload = function(e) {
      var img = this.result;
      localStorage.setItem("new_avatar", img);
      that.props.history.replace("/avatar/set");
    }
  }
  render() {
    if (!MyAction.userCheck()) {
      return <Redirect to='/login' />;
    }
    var avatar = this.state.avatar;
    return (
      <div className="App avatar-page">
        <div className="App-header avatar-header">
          <img className="back-arrow" src="/images/ic_arrow_back_white_36dp_2x.png" onClick={this.back} />
          <img className="avatar-action-button" src="/images/ic_more_vert_white_36dp_2x.png" onClick={this.chooseAvatar} />
        </div>
        <div className="App-body avatar-body">
          <div id="avatar-page-img-outer-div">
            <img className="avatar-page-img" src={MyAction.getAvatarPath(avatar)} />
          </div>
          <input onChange={this.goSetAvatar} ref={(avatar) => { this.avatarInput = avatar; }} type="file" accept="image/*" style={{ display: "none" }} />
        </div>
      </div>
    )
  }
}

export default AvatarPage;
