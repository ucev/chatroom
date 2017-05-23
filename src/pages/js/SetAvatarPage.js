import React from 'react';
import BasePage from './BasePage';
import {
  Redirect
} from 'react-router-dom';
import ImageCropper from 'imagecropper';

import '../css/AvatarPage.css';
import 'imagecropper/src/css/image-cropper.css';

import MyAction from '../../state/action';

class SetAvatarPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.cropper = undefined;
    this.back = this.back.bind(this);
    this.done = this.done.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.image.src = localStorage.getItem("new_avatar");
    this.cropper = new ImageCropper({
      element: document.getElementsByClassName("avatar-page-img")[0],
      aspectRatio: 1
    })
  }
  componentWillUnmount() {
    localStorage.removeItem("new_avatar");
  }
  shouldComponentUpdate() {
    return false;
  }
  back() {
    this.props.history.goBack();
  }
  done() {
    if (this.cropper) {
      var img = this.cropper.getImage();
      MyAction.uploadAvatar(img).then(() => {
        this.props.history.goBack();
      }).catch(() => {
        alert("更新失败");
      })
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
          <img className="avatar-action-button" src="/images/ic_done_white_36dp_2x.png" onClick={this.done} />
        </div>
        <div className="App-body avatar-body">
          <div id="avatar-page-img-outer-div">
            <img ref={(img) => {this.image = img;}} className="avatar-page-img" src={this.props.avatar} />
          </div>
        </div>
      </div>
    )
  }
}

export default SetAvatarPage;
