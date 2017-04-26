import React, { Component } from 'react';
import '../css/SentenceInput.css';

import MyAction from '../../state/action';

class SentenceInput extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.sendSentence = this.sendSentence.bind(this);
  }
  onKeyDown(e) {
    if (e.which == 13) {
      this.sendSentence();
    }
  }
  sendSentence() {
    var sentence = this.sentenceInput.value;
    MyAction.sendSentence(sentence);
    this.sentenceInput.value = "";
  }
  render() {
    return (
      <div className="sentence-input-div">
        <input ref={(input)=>{this.sentenceInput=input;}} className="sentence-input" type="text" onKeyDown={this.onKeyDown} />
        <button className="send-sentence-button" onClick={this.sendSentence}>发送</button>
      </div>
    )
  }
}

export default SentenceInput;
