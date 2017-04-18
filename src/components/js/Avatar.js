import React, { Component } from 'react';
import '../css/Avatar.css';

class Avatar extends Component {
  render() {
    return (
      <img src={this.props.imgsrc} className="avatar" alt="avatar"/>
    );
  }
}

export default Avatar;
