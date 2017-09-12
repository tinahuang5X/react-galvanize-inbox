// Write a unit test for MessageComponent using Jest/Enzyme which validates the following (at minimum):
//
//     The message's subject line is rendered
//     The read CSS class is present when message.read is true
//     The unread CSS class is present when message.read is false
//     The star icon is filled when the message.starred is true
//     The selected CSS class is present when the selected prop is true
//     The checkbox is checked when the selected prop is true
//     The onAddItem callback gets triggered when you click on the "Add to Order" button/link
//     The onMarkAsReadMessage callback is triggered when the message's subject line is clicked
//     The onSelectMessage callback is triggered when the checkbox is checked
//     The onDeselectMessage callback is triggered when the checkbox is unchecked
//     The onStarMessage callback is triggered when star icon is clicked and was not yet filled
//     The onUnstarMessage callback is triggered when star icon is clicked and was already filled
//     Note: Shallow rendering should be sufficient
//
// Also, write a snapshot test for MessageComponent using Jest.
// Test MessagesComponent
//
// Write a unit test for MessagesComponent using Jest/Enzyme which validates the following (at minimum):
//
//     Verify the expected number of MessageComponents are rendered based on the number of messages that are passed into MessagesComponent
//     All of callbacks gets triggered when you interact with an individual message

import React from 'react';
import { shallow, mount } from 'enzyme';
import MessageComponent from '../components/MessageComponent';
import MessagesComponent from '../components/MessagesComponent';
//import ToolBarComponent from '../components/ToolBarComponent';

const message = {
  subject: 'Hello!',
  body: 'How are you?',
  read: false,
  starred: true,
  labels: ['personal']
};

let selectedMessageIds = [1, 3];

let messages = [
  {
    id: 1,
    subject: 'Today is a beautiful day!',
    read: false,
    starred: true,
    labels: ['sales', 'personal']
  },
  {
    id: 2,
    subject: 'NO CLASS LABOR DAY',
    read: false,
    starred: true,
    labels: ['gschool']
  },
  {
    id: 3,
    subject: 'Groupon San Francisco',
    read: false,
    starred: true,
    labels: ['sales']
  }
];

const selected = true;
const onMarkAsReadMessage = jest.fn();
const onSelectMessage = jest.fn();
const onDeselectMessage = jest.fn();
const onStarMessage = jest.fn();
const onUnstarMessage = jest.fn();

const fullWrapper = mount(
  <MessagesComponent
    messages={messages}
    selectedMessageIds={selectedMessageIds}
    onMarkAsReadMessage={onMarkAsReadMessage}
    onSelectMessage={onSelectMessage}
    onDeselectMessage={onDeselectMessage}
    onStarMessage={onStarMessage}
    onUnstarMessage={onUnstarMessage}
  />
);

describe('a unit test for MessageComponent', () => {
  const shallowWrapper = shallow(
    <MessageComponent message={message} selected={selected} />
  );
  it('should display subject line', () => {
    expect(shallowWrapper.find('.checkSubject')).toHaveLength(1);
  });
  it('should appear read when the message was read', () => {
    if (message.read) expect(shallowWrapper.find('.read')).toHaveLength(1);
    else expect(shallowWrapper.find('.read')).toHaveLength(0);
  });
  it('should appear starred when the message was starred and vice versa', () => {
    if (message.star) expect(shallowWrapper.find('.star')).toHaveLength(1);
    else expect(shallowWrapper.find('.star')).toHaveLength(1);
  });

  it('checkbox is checked when the selected prop is true', () => {
    if (selected)
      expect(shallowWrapper.find('.checkSelected').prop('checked')).toBe(true);
    else
      expect(shallowWrapper.find('checkSelected').prop('checked')).toBe(false);
  });

  it('onMarkAsReadMessage callback is triggered when the subject line is clicked', () => {
    const onMarkAsReadMessage = jest.fn();
    mount(
      <MessageComponent
        message={message}
        selected={selected}
        onMarkAsReadMessage={onMarkAsReadMessage}
      />
    )
      .find('.checkSubject')
      .simulate('click');
    expect(onMarkAsReadMessage).toHaveBeenCalled();
  });

  it('onSelectMessage callback is triggered when the checkbox is checked - and Vice Versa', () => {
    const onSelectMessage = jest.fn();
    const onDeselectMessage = jest.fn();
    mount(
      <MessageComponent
        message={message}
        selected={selected}
        onSelectMessage={onSelectMessage}
        onDeselectMessage={onDeselectMessage}
      />
    )
      .find('.checkSelected')
      .simulate('click');

    if (selected) expect(onDeselectMessage).toHaveBeenCalled();
    else expect(onSelectMessage).toHaveBeenCalled();
  });

  it('tests children elements with full rendering', () => {
    expect(fullWrapper.children()).toHaveLength(3);
  });

  // it ('test all of callbacks gets triggered when you interact with an individual message', () => {
  //   expect(fullWrapper.)
  // }
});
