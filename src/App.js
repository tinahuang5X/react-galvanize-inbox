import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import InboxPage from './components/InboxPage';
import getMessages from './api/getMessages';
import updateMessage from './api/updateMessage';
import createMessage from './api/createMessage';
import deleteMessage from './api/deleteMessage';

//app = new App({});
//element = app.render()
//putItIntoDom(element);
//app.componentDidMount();

class App extends Component {
  //experimental syntax
  state = {
    messages: [],
    selectedMessageIds: [],
    showComposeForm: false,
    showApiError: false
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
    updateMessage(messageId, { read: true }).then(() => {
      this.setState(prevState => {
        const newMessages = prevState.messages.slice(0);
        newMessages.filter(
          newMessage => newMessage.id === messageId
        )[0].read = true;
        //updateMessage(messageId, { read: true });
        return { messages: newMessages };
      });
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

  // _starMessage = messageId => {
  //   updateMessage(messageId, { starred: true }).then(() => {
  //     this.setState(prevState => {
  //       const newMessages = prevState.messages.slice(0);
  //       newMessages.filter(
  //         newMessage => newMessage.id === messageId
  //       )[0].starred = true;
  //       return { messages: newMessages };
  //     });
  //   });
  // };

  // Alternative way below:
  //

  _starMessage = messageId => {
    updateMessage(messageId, { starred: true })
      .then(updatedMessage => {
        this.setState(prevState => {
          return {
            messages: prevState.messages.map(
              message => (message.id === messageId ? updatedMessage : message)
            )
          };
        });
      })
      .catch(error => {
        alert('ERROR MESSAGE');
      });
  };

  _unstarMessage = messageId => {
    updateMessage(messageId, { starred: false }).then(() => {
      this.setState(prevState => {
        const newMessages = prevState.messages.slice(0);
        newMessages.filter(
          newMessage => newMessage.id === messageId
        )[0].starred = false;
        return { messages: newMessages };
      });
    });
  };

  _applyLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      updateMessage(messageId, { labels: label }).then(messages => {
        this.setState(prevState => {
          const newMessages = prevState.messages.slice(0);
          let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
          newMessages.forEach(newMessage => {
            if (
              newSelectedMessageIds.includes(newMessage.id) &&
              !newMessage.labels.includes(label)
            ) {
              newMessage.labels.push(label);
              // updateMessage(newMessage.id, {
              //   labels: newMessage.labels.toString()
              // });
              return { messages: newMessages };
            }
          });
        });
      });
    });
  };

  _removeLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      updateMessage(messageId, { labels: label }).then(messages => {
        this.setState(prevState => {
          const newMessages = prevState.messages.slice(0);
          let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
          newMessages.forEach(newMessage => {
            if (newSelectedMessageIds.includes(newMessage.id)) {
              newMessage.labels.forEach(selectedLabel => {
                if (label === selectedLabel) {
                  newMessage.labels.splice(newMessage.labels.indexOf(label), 1);
                  // updateMessage(newMessage.id, {
                  //   labels: newMessage.labels.toString()
                  // });
                  return { messages: newMessages };
                }
              });
            }
          });
        });
      });
    });
  };

  // _submit = (subject, body) => {
  //   this.setState(prevState => {
  //     const newMessages = prevState.messages.slice(0);
  //     let newShowComposeForm = prevState.showComposeForm;
  //     let newMessage1 = {
  //       id: 0,
  //       subject: subject,
  //       body: body,
  //       read: false,
  //       starred: false,
  //       labels: ['new']
  //     };
  //     if (newMessages.length > 0) {
  //       newMessage1.id = newMessages[newMessages.length - 1].id + 1;
  //     } else {
  //       newMessage1.id = 1;
  //     }
  //     newMessages.push(newMessage1);
  //     //console.log(newMessages);
  //     createMessage(newMessage1);
  //
  //     newShowComposeForm = false;
  //     setTimeout(
  //       getMessages().then(records => this.setState({ messages: records })),
  //       5000
  //     );
  //     return { showComposeForm: newShowComposeForm, messages: newMessages };
  //   });
  // };

  _submit = (subject, body) => {
    let newMessage = {
      id: 0,
      subject: subject,
      read: false,
      starred: false,
      labels: ['new'],
      body: body
    };

    createMessage(newMessage).then(createdMsg => {
      newMessage.id = createdMsg.id;
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.push(newMessage);
        return {
          messages: newMessages,
          showComposeForm: false
        };
      });
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
          updateMessage(newMessage.id, { read: true });
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
          updateMessage(newMessage.id, { read: false });
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
          deleteMessage(newMessages[i].id);
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
