import React, { Component } from 'react';
import PageBarItem from './PageBarItem';
import '../css/PageChooser.css';

class PageBar extends Component {
  render() {
    var pages = this.props.pages.map((page) => {
      return <PageBarItem key={page.page} page={page}/>
    })
    return (
      <ul className="page-chooser">
        {pages}
      </ul>
    );
  }
}

export default PageBar;
