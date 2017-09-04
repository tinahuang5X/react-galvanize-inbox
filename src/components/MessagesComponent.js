import React from 'react';

import MessageComponent from './MessageComponent';

export default function MessagesComponent({
  messages,
  selectedMessageIds,
  onMarkAsReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage
}) {
  return (
    <div className="MessagesComponent">
      {messages.map(message =>
        <MessageComponent
          key={message.id}
          selected={
            selectedMessageIds.indexOf(message.id) !== -1 ? true : false
          }
          message={message}
          onMarkAsReadMessage={onMarkAsReadMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
        />
      )}
    </div>
  );
}
