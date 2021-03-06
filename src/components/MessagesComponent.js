import React from 'react';

import MessageComponent from './MessageComponent';
export default function MessagesComponent({ messages, selectedMessageIds }) {
  return (
    <div>
      {messages.map(message => {
        let selected = false;
        if (
          selectedMessageIds.find(selectedMessageId => {
            if (selectedMessageId === message.id) return true;
          })
        )
          selected = true;

        return (
          <MessageComponent
            selected={selected}
            message={message}
            key={message.id}
          />
        );
      })}
    </div>
  );
}
