import React from 'react';

import InboxPageLayout from './InboxPageLayout';
import MessagesComponent from './MessagesComponent';
import ToolBarComponent from './ToolBarComponent';
import ComposeFormComponent from './ComposeFormComponent';

export default function InboxPage({
  messages,
  selectedMessageIds,
  showComposeForm,
  onOpenComposeForm,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages,
  onMarkAsReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage,
  onSubmit,
  onCancel
}) {
  return (
    <div className="InboxPage">
      <InboxPageLayout>
        <ToolBarComponent
          messages={messages}
          selectedMsgCount={selectedMessageIds && selectedMessageIds.length}
          selectedMessageIds={selectedMessageIds}
          onOpenComposeForm={onOpenComposeForm}
          onSelectAllMessages={onSelectAllMessages}
          onDeselectAllMessages={onDeselectAllMessages}
          onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
          onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
          onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
          onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
          onDeleteSelectedMessages={onDeleteSelectedMessages}
        />
        {showComposeForm &&
          <ComposeFormComponent onSubmit={onSubmit} onCancel={onCancel} />}
        <MessagesComponent
          messages={messages}
          selectedMessageIds={selectedMessageIds}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
        />
      </InboxPageLayout>
    </div>
  );
}
