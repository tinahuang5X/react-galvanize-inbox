import React from 'react';

import InboxPageLayout from './InboxPageLayout';
import MessagesComponent from './MessagesComponent';
import ToolBarComponent from './ToolBarComponent';
import ComposeFormComponent from './ComposeFormComponent';

export default function InboxPage({
  id,
  messages,
  selectedMessageIds,
  selectedMsgCount
}) {
  return (
    <div id={id} className="InboxPage">
      <InboxPageLayout>
        <ToolBarComponent
          messages={messages}
          selectedMsgCount={selectedMsgCount}
        />
        <ComposeFormComponent />

        <MessagesComponent
          messages={messages}
          selectedMessageIds={selectedMessageIds}
        />
      </InboxPageLayout>
    </div>
  );
}
