import React from 'react';

export default function InboxPageLayout(props) {
  return (
    <div className="InboxPage">
      <div className="ToolBar">
        {props.children[0]}
      </div>
      <div className="Messages">
        {props.children[1]}
      </div>
      <div className="ComposeForm">
        {props.children[2]}
      </div>
    </div>
  );
}
