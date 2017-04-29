import React, { Component } from 'react';
import '../css/PageBarItem.css';

import MyAction from '../../state/action';

class PageBarItem extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
  }
  onclick() { 
    var page = this.props.page;
    MyAction.pageSetState("front_page", page);
  }
  render() {
    return (
      <li className="page-bar-item" onClick={this.onclick}>
        <img className="page-bar-item-icon" src={this.props.icon} alt="{this.props.label" />
        <span className="page-bar-item-label">{this.props.label}</span>
      </li>
    );
  }
}

export default PageBarItem;
