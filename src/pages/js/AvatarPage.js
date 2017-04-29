import React, { Component } from 'react';

import '../css/AvatarPage.css';

import MyAction from '../../state/action';

class AvatarPage extends Component {
  constructor(props) {
    super(props);
    this.chooseAvatar = this.chooseAvatar.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }
  back() {
    MyAction.pageBack();
  }
  chooseAvatar() {
    this.avatarInput.click();
  }
  uploadAvatar(e) {
    MyAction.uploadAvatar(this.avatarInput.files[0]);
  }
  render() { 
    return (
      <div className="App avatar-page">
        <div className="App-header avatar-header">
          <img className="back-arrow" src="/images/ic_arrow_back_white_36dp_2x.png" onClick={this.back} />
          <img className="avatar-choose-photo" src="/images/ic_photo_white_36dp_2x.png" onClick={this.chooseAvatar} />
        </div>
        <div className="App-body avatar-body">
          <img className="avatar-page-img" src={MyAction.getAvatarPath(this.props.avatar)} />
          <input onChange={this.uploadAvatar} ref={(avatar) => { this.avatarInput = avatar; }} type="file" accept="image/*" style={{ display: "none" }} />
        </div>
      </div>
    )
  }
}

export default AvatarPage;
