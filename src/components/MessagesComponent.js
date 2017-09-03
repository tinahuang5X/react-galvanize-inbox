import React from 'react';

import MessageComponent from './MessageComponent';
export default function MessagesComponent({ messages, selectedMessageIds }) {
  return (
    <div className="MessagesComponent">
      {messages.map(message =>
        <MessageComponent
          key={message.id}
          selected={
            selectedMessageIds.indexOf(message.id) !== -1 ? true : false
          }
          message={message}
        />
      )}
    </div>
  );
}
