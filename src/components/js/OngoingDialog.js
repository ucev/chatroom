import React, { Component } from 'react';
import OngoingDialogItem from './OngoingDialogItem';
import '../css/OngoingDialog.css';

import moment from 'moment';

import MyAction from '../../state/action';

class OngoingDialog extends Component {
  getUserInfo(users, id) {
    for (var user of users) {
      if (user.id == id) {
        return user;
      }
    }
    return {};
  }
  getChatTime(tm) {
    if (!tm) { return "" };
    var now = moment();
    var last = moment(tm);
    if (now.year() == last.year() && now.month() == last.month() && now.dayOfYear() == last.dayOfYear()) {
      return last.format("HH:mm");
    } else {
      return last.format("M-D");
    }
  }
  render() {
    var state = MyAction.getState();
    var users = state.users;
    var ongoingDialog = MyAction.storeChatList();
    var dialogs = ongoingDialog.map((dialog) => {
      var toid = Number(dialog.id);
      var userinfo = this.getUserInfo(users, toid);
      var lastDialog = dialog.dialog;
      if (!toid || !userinfo || !lastDialog) return;
      return <OngoingDialogItem key={toid} toid={toid} user={userinfo} datetime={this.getChatTime(lastDialog.datetime)} content={lastDialog.content} unread={dialog.unread} />
    })
    return (
      <ul className="ongoing-dialog">
        {dialogs}
      </ul>
    )
  }
}

export default OngoingDialog;