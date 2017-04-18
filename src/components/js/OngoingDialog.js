import React, { Component } from 'react';
import OngoingDialogItem from './OngoingDialogItem';
import '../css/OngoingDialog.css';

class OngoingDialog extends Component {
  render() {
    var dialogs = this.props.dialogs.map((dialog) => {
      return <OngoingDialogItem avatar={dialog.avatar} nickname={dialog.nickname} datetime={dialog.datetime} conversation={dialog.conversation} />
    })
    return (
      <ul className="ongoing-dialog">
        {dialogs}
      </ul>
    )
  }
}

export default OngoingDialog;