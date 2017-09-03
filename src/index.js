import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import InboxPage from './components/InboxPage';

const messages = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ['dev', 'personal']
  },
  {
    id: 2,
    subject:
      "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    labels: []
  },
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev']
  },
  {
    id: 4,
    subject: 'We need to program the primary TCP hard drive!',
    read: true,
    starred: false,
    labels: []
  },
  {
    id: 5,
    subject:
      'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal']
  },
  {
    id: 6,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: []
  },
  {
    id: 7,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal']
  },
  {
    id: 8,
    subject:
      'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: []
  }
];

let selectedMessageIds = [2, 4];

//const selectedMsgCount = 3;

let showComposeForm = false;

function onMarkAsReadMessage(messageId) {
  //for (let message of messages) {
  //console.log(message);
  //if (message.id === messageId) message.read = 'true';
  //}
  messages.filter(message => message.id === messageId)[0].read = true;
  render();
}
// function onSelectMessage(messageId) {
// for (let message of messages) {
// if (message.id === messageId) selected = 'true';
// }
// render();
// }
function onSelectMessage(messageId) {
  selectedMessageIds.push(messageId);

  render();
}

function onDeselectMessage(messageId) {
  selectedMessageIds.splice(selectedMessageIds.indexOf(messageId), 1);
  render();
}
function onStarMessage(messageId) {
  messages.filter(message => message.id === messageId)[0].starred = true;
  render();
}
function onUnstarMessage(messageId) {
  messages.filter(message => message.id === messageId)[0].starred = false;
  render();
}
function onApplyLabelSelectedMessages(label) {
  messages.forEach(message => {
    if (
      selectedMessageIds.includes(message.id) &&
      !message.labels.includes(label)
    ) {
      message.labels.push(label);
    }
  });
  render();
}
function onRemoveLabelSelectedMessages(label) {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      message.labels.forEach(selectedLabel => {
        if (label === selectedLabel) {
          message.labels.splice(message.labels.indexOf(label), 1);
        }
      });
    }
  });
  render();
}
function onSubmit(subject, body) {
  let newMessage1 = {
    id: 0,
    subject: subject,
    read: false,
    starred: false,
    labels: ['new']
  };
  if (messages.length > 0) {
    newMessage1.id = messages[messages.length - 1].id + 1;
  } else {
    newMessage1.id = 1;
  }
  messages.push(newMessage1);
  showComposeForm = false;
  render();
}

function onCancel() {
  showComposeForm = false;
  render();
}
function onOpenComposeForm() {
  showComposeForm = !showComposeForm;
  render();
}
function onSelectAllMessages() {
  /*selectedMessageIds = [];
  for (let message of messages) {
    selectedMessageIds.push(message.id);
  }
  console.log(selectedMessageIds);
  */
  selectedMessageIds = messages.map(message => message.id);
  render();
}

function onDeselectAllMessages() {
  selectedMessageIds = [];

  render();
}
function onMarkAsReadSelectedMessages() {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      message.read = true;
    }
  });

  render();
}

function onMarkAsUnreadSelectedMessages() {
  messages.forEach(message => {
    if (selectedMessageIds.includes(message.id)) {
      message.read = false;
    }
  });
  render();
}

function onDeleteSelectedMessages() {
  for (let i = 0; i < messages.length; i++) {
    if (selectedMessageIds.includes(messages[i].id)) {
      messages.splice(i, 1);
      i = i - 1;
    }
  }
  selectedMessageIds = [];
  render();
}

function render() {
  ReactDOM.render(
    <InboxPage
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      showComposeForm={showComposeForm}
      onOpenComposeForm={onOpenComposeForm}
      onSelectAllMessages={onSelectAllMessages}
      onDeselectAllMessages={onDeselectAllMessages}
      onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
      onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
      onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
      onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
      onDeleteSelectedMessages={onDeleteSelectedMessages}
      onMarkAsReadMessage={onMarkAsReadMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />,
    document.getElementById('root')
  );
}
render();
//registerServiceWorker();
