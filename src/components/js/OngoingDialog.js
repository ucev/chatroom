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
    var now = moment();
    var last = moment(tm);
    if (now.year() == last.year() && now.month() == last.month() && now.dayOfYear() == last.dayOfYear()) {
      return last.format("HH:mm");
    } else {
      return last.format("M-D");
    }
  }
  render() {
    var users = this.props.users;
    var dialogs = this.props.dialogs.map((dialog) => {
      var toid = Number(dialog.id);
      var userinfo = this.getUserInfo(users, toid);
      var lastDialog = dialog.dialog;
      return <OngoingDialogItem key={toid} toid={toid} avatar={MyAction.getAvatarPath(userinfo.avatar)} nickname={userinfo.name} datetime={this.getChatTime(lastDialog.datetime)} content={lastDialog.content} unread={dialog.unread} />
    })
    return (
      <ul className="ongoing-dialog">
        {dialogs}
      </ul>
    )
  }
}

export default OngoingDialog;