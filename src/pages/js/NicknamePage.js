import React from 'react';
import BasePage from './BasePage';

import '../css/NicknamePage.css';

import MyAction from '../../state/action';

class NicknamePage extends BasePage {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.onNicknameChange = this.onNicknameChange.bind(this);
    this.updateNickname = this.updateNickname.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.nicknameInput.value = this.state.nickname;
  }
  back() {
    this.props.history.goBack();
  }
  onNicknameChange(e) {
    this.setState({
      nickname: this.nicknameInput.value
    })
  }
  updateNickname() {
    MyAction.updateNickname(this.nicknameInput.value).then(() => {
      this.back();
    })
  }
  render() {
    if (!MyAction.userCheck()) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App nickname-page">
        <div className="App-header nickname-header">
          <img className="back-arrow" src="/images/ic_arrow_back_white_36dp_2x.png" onClick={this.back} />
          <span className="nickname-label">更改昵称</span>
          <button className="nickname-save" onClick={this.updateNickname}>保存</button>
        </div>
        <div className="App-body">
          <input className="nickname-input" ref={(nicknameInput) => { this.nicknameInput = nicknameInput; }} type="text" />
        </div>
      </div>
    )
  }
}

export default NicknamePage;
