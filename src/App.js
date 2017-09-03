import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import InboxPage from './components/InboxPage';

import getMessages from './api/updateMessage';

//app = new App({});
//element = app.render()
//putItIntoDom(element);
//app.componentDidMount();
// const messages = [
//   {
//     id: 1,
//     subject:
//       "You can't input the protocol without calculating the mobile RSS protocol!",
//     read: false,
//     starred: true,
//     labels: ['dev', 'personal']
//   },
//   {
//     id: 2,
//     subject:
//       "connecting the system won't do anything, we need to input the mobile AI panel!",
//     read: false,
//     starred: false,
//     labels: []
//   },
//   {
//     id: 3,
//     subject:
//       'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
//     read: false,
//     starred: true,
//     labels: ['dev']
//   },
//   {
//     id: 4,
//     subject: 'We need to program the primary TCP hard drive!',
//     read: true,
//     starred: false,
//     labels: []
//   },
//   {
//     id: 5,
//     subject:
//       'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
//     read: false,
//     starred: false,
//     labels: ['personal']
//   },
//   {
//     id: 6,
//     subject: 'We need to back up the wireless GB driver!',
//     read: true,
//     starred: true,
//     labels: []
//   },
//   {
//     id: 7,
//     subject: 'We need to index the mobile PCI bus!',
//     read: true,
//     starred: false,
//     labels: ['dev', 'personal']
//   },
//   {
//     id: 8,
//     subject:
//       'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
//     read: true,
//     starred: true,
//     labels: []
//   }
// ];

class App extends Component {
  //experimental syntax
  state = {
    messages: [],

    selectedMessageIds: [],
    showComposeForm: false
  };

  render() {
    return (
      <div className="App">
        <InboxPage
          messages={this.state.messages}
          selectedMessageIds={this.state.selectedMessageIds}
          showComposeForm={this.state.showComposeForm}
          onOpenComposeForm={this._openComposeForm}
          onSelectAllMessages={this._selectAllMessages}
          onDeselectAllMessages={this._deselectAllMessages}
          onMarkAsReadSelectedMessages={this._markAsReadSelectedMessages}
          onMarkAsUnreadSelectedMessages={this._markAsUnreadSelectedMessages}
          onApplyLabelSelectedMessages={this._applyLabelSelectedMessages}
          onRemoveLabelSelectedMessages={this._removeLabelSelectedMessages}
          onDeleteSelectedMessages={this._deleteSelectedMessages}
          onMarkAsReadMessage={this._markAsReadMessage}
          onSelectMessage={this._selectMessage}
          onDeselectMessage={this._deselectMessage}
          onStarMessage={this._starMessage}
          onUnstarMessage={this._unstarMessage}
          onSubmit={this._submit}
          onCancel={this._cancel}
        />
      </div>
    );
  }

  componentDidMount() {
    getMessages().then(records => this.setState({ messages: records }));
  }

  _markAsReadMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.filter(
        newMessage => newMessage.id === messageId
      )[0].read = true;
      return { messages: newMessages };
    });
  };

  _selectMessage = messageId => {
    this.setState(prevState => {
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds.push(messageId);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _deselectMessage = messageId => {
    this.setState(prevState => {
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds.splice(newSelectedMessageIds.indexOf(messageId), 1);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _starMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.filter(
        newMessage => newMessage.id === messageId
      )[0].starred = true;
      return { messages: newMessages };
    });
  };

  _unstarMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.filter(
        newMessage => newMessage.id === messageId
      )[0].starred = false;
      return { messages: newMessages };
    });
  };

  _applyLabelSelectedMessages = label => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newMessages.forEach(newMessage => {
        if (
          newSelectedMessageIds.includes(newMessage.id) &&
          !newMessage.labels.includes(label)
        ) {
          newMessage.labels.push(label);

          return { messages: newMessages };
        }
      });
    });
  };

  _removeLabelSelectedMessages = label => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newMessages.forEach(newMessage => {
        if (newSelectedMessageIds.includes(newMessage.id)) {
          newMessage.labels.forEach(selectedLabel => {
            if (label === selectedLabel) {
              newMessage.labels.splice(newMessage.labels.indexOf(label), 1);
              return { messages: newMessages };
            }
          });
        }
      });
    });
  };

  _submit = (subject, body) => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      let newShowComposeForm = prevState.showComposeForm;
      let newSelectedMessageIds = prevState.selectedMessageIds;
      let newMessage1 = {
        id: 0,
        subject: subject,
        read: false,
        starred: false,
        labels: ['new']
      };
      if (newMessages.length > 0) {
        newMessage1.id = newMessages[newMessages.length - 1].id + 1;
      } else {
        newMessage1.id = 1;
      }

      if (newSelectedMessageIds.includes(newMessage1.id)) {
        newSelectedMessageIds.splice(
          newSelectedMessageIds.indexOf(newMessage1.id),
          1
        );
      }
      newMessages.push(newMessage1);
      //console.log(newMessages);
      newShowComposeForm = false;
      return { showComposeForm: newShowComposeForm, messages: newMessages };
    });
  };

  _cancel = () => {
    this.setState(prevState => {
      let newShowComposeForm = prevState.showComposeForm;
      newShowComposeForm = false;
      return { showComposeForm: newShowComposeForm };
    });
  };

  _openComposeForm = () => {
    this.setState(prevState => {
      let newShowComposeForm = prevState.showComposeForm;
      newShowComposeForm = !newShowComposeForm;
      return { showComposeForm: newShowComposeForm };
    });
  };

  _selectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      const newMessages = prevState.messages.slice(0);
      newSelectedMessageIds = newMessages.map(newMessage => newMessage.id);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _deselectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds = [];
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _markAsReadSelectedMessages = () => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newMessages.forEach(newMessage => {
        if (newSelectedMessageIds.includes(newMessage.id)) {
          newMessage.read = true;
        }
      });
      return { messages: newMessages };
    });
  };

  _markAsUnreadSelectedMessages = () => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newMessages.forEach(newMessage => {
        if (newSelectedMessageIds.includes(newMessage.id)) {
          newMessage.read = false;
        }
      });
      return { messages: newMessages };
    });
  };

  _deleteSelectedMessages = () => {
    this.setState(prevState => {
      let newMessages = prevState.messages.slice(0);
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      for (let i = 0; i < newMessages.length; i++) {
        if (newSelectedMessageIds.includes(newMessages[i].id)) {
          newMessages.splice(i, 1);
          i = i - 1;
        }
      }
      newSelectedMessageIds = [];
      return {
        messages: newMessages,
        selectedMessageIds: newSelectedMessageIds
      };
    });
  };
}

export default App;
