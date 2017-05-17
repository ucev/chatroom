import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import '../css/PageBarItem.css';

import MyAction from '../../state/action';
class PageBarItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var page = this.props.page;
    return (
      <li className="page-bar-item">
        <Link to={`${page.url}`}>
          <img className="page-bar-item-icon" src={page.icon} alt={page.label} />
          <span className="page-bar-item-label">{page.label}</span>
        </Link>
      </li>
    );
  }
}

export default PageBarItem;
