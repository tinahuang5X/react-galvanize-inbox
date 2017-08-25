import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageComponent from './MessageComponent';

storiesOf('MessageComponent', module)
  .add('Unread path', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      }}
    />
  )
  .add('Read path', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      }}
    />
  )
  .add('Selected path', () =>
    <MessageComponent
      selected={true}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      }}
    />
  )
  .add('Starred path', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      }}
    />
  )
  .add('With labels path', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      }}
    />
  );
