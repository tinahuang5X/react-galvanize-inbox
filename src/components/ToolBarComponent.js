import React from 'react';
//import './index.css';

export default function ToolBarComponent({ messages, selectedMsgCount }) {
  let totalMsgCount = messages.length;
  let unreadMsgCount = 2;

  let selectAllButtonClass;
  if (selectedMsgCount === 0) {
    selectAllButtonClass = 'fa fa-square-o';
  } else if (selectedMsgCount === totalMsgCount) {
    selectAllButtonClass = 'fa fa-check-square-o';
  } else {
    selectAllButtonClass = 'fa fa-minus-square-o';
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMsgCount}</span>
          unread messages
        </p>
        <a className="btn btn-danger">
          <i className="fa fa-plus" />
        </a>
        <button className="btn btn-default">
          <i className={selectAllButtonClass} />
        </button>
        <button className="btn btn-default" disabled={selectedMsgCount === 0}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={selectedMsgCount === 0}>
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled={selectedMsgCount === 0}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled={selectedMsgCount === 0}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>
        <button className="btn btn-default" disabled={selectedMsgCount === 0}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
