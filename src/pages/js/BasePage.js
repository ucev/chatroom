import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom';

import MyAction from '../../state/action';

class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.__update = this.__update.bind(this);
  }
  componentDidMount() {
    MyAction.subscribe(this.__update);
    /** 
     * configs for HMR  
     */
    localStorage.setItem("chatroom_path", JSON.stringify(this.props.history));
  }
  componentWillUnmount() {
    MyAction.unsubscribe();
  }
  __update() {
    /**
     * 此处可以更加细化，如注册感兴趣的变量
     * 当只有检测到感兴趣的变量发生变化时
     * 才更新 state 
     */
    this.setState(MyAction.getState());
  }
}

export default BasePage;
