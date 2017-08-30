import React from 'react';
//import './index.css';

export default function ToolBarComponent({
  messages,
  selectedMsgCount,
  onOpenComposeForm,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages
}) {
  let totalMsgCount = messages.length;
  let readMsgCount = messages.filter(message => message.read).length;
  let unreadMsgCount = totalMsgCount - readMsgCount;

  let selectAllButtonClass;
  if (selectedMsgCount === 0) {
    selectAllButtonClass = 'fa fa-square-o';
  } else if (selectedMsgCount === totalMsgCount) {
    selectAllButtonClass = 'fa fa-check-square-o';
  } else {
    selectAllButtonClass = 'fa fa-minus-square-o';
  }
  function handleComposeForm(event) {
    event.preventDefault();
    onOpenComposeForm();
  }
  function handleSelect(event) {
    event.preventDefault();
    console.log('this function is running');
    console.log('selectedCount', selectedMsgCount);
    if (selectedMsgCount > 0 && selectedMsgCount < totalMsgCount) {
      onSelectAllMessages();
      console.log(selectedMsgCount, totalMsgCount);
      // selectedMsgCount = totalMsgCount;
    }
    if (selectedMsgCount === totalMsgCount) onDeselectAllMessages();
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMsgCount}</span>
          unread messages
        </p>
        <a className="btn btn-danger">
          <i className="fa fa-plus" onClick={handleComposeForm} />
        </a>
        <button className="btn btn-default" onClick={handleSelect}>
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
