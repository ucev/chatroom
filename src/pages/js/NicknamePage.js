import React, { Component } from 'react';

import '../css/NicknamePage.css';

import MyAction from '../../state/action';

class NicknamePage extends Component {
  constructor(props) {
    super(props);
    this.onNicknameChange = this.onNicknameChange.bind(this);
    this.updateNickname = this.updateNickname.bind(this);
  }
  componentDidMount() {
    this.nicknameInput.value = this.props.nickname;
  }
  back() {
    MyAction.pageBack();
  }
  onNicknameChange(e) {
    this.setState({
      nickname: this.nicknameInput.value
    })
  }
  updateNickname() {
    MyAction.updateNickname(this.nicknameInput.value);
  }
  render() {
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
