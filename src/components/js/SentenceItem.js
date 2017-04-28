import React, { Component } from 'react';

import '../css/SentenceItem.css';

class SentenceItem extends Component {
  render() {
    var direct = this.props.fromid == this.props.ownerid ? "right" : "left";
    var itemName = `sentence-item sentence-item-${direct}`;
    return (
      <div className={itemName}>
        <img className="sentence-item-avatar" src={this.props.avatar} />
        <div className="sentence-item-detail">
          <div className="sentence-item-nickname">{this.props.nickname}</div>
          <div className="sentence-item-content">{this.props.content}</div>
        </div>
      </div>
    )
  }
}

export default SentenceItem;
