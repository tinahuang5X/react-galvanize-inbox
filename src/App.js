import React, { Component } from 'react';
//import logo from './logo.svg';
import env from './env';
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

export default class App extends Component {
  //experimental syntax
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      selectedMessageIds: [],
      showComposeForm: false,
      showApiError: false
    };

    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }

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
    getMessages({
      databaseId: env.AIRTABLE_DATABASE_ID,
      token: env.AIRTABLE_TOKEN
    }).then(messages => {
      this.props.store.dispatch({ type: 'SET_MESSAGES', messages });
    });
  }

  _markAsReadMessage = messageId => {
    updateMessage(
      messageId,
      { read: true },
      {
        databaseId: env.AIRTABLE_DATABASE_ID,
        token: env.AIRTABLE_TOKEN
      }
    ).then(updatedMessage => {
      this.props.store.dispatch({
        type: 'UPDATE_MESSAGE',
        messsage: updatedMessage
      });
    });
  };

  _selectMessage = messageId => {
    this.props.store.dispatch({ type: 'SELECT_MESSAGE', messageId });
  };

  _deselectMessage = messageId => {
    this.props.store.dispatch({ type: 'DESELECT_MESSAGE', messageId });
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
    updateMessage(
      messageId,
      { starred: true },
      {
        databaseId: env.AIRTABLE_DATABASE_ID,
        token: env.AIRTABLE_TOKEN
      }
    ).then(updatedMessage => {
      this.props.store.dispatch({
        type: 'UPDATE_MESSAGE',
        messsage: updatedMessage
      });
    });
  };

  _unstarMessage = messageId => {
    updateMessage(
      messageId,
      { starred: false },
      {
        databaseId: env.AIRTABLE_DATABASE_ID,
        token: env.AIRTABLE_TOKEN
      }
    ).then(updatedMessage => {
      this.props.store.dispatch({
        type: 'UPDATE_MESSAGE',
        messsage: updatedMessage
      });
    });
  };

  _applyLabelSelectedMessages = label => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId => {
        this.state.messages.forEach(message => {
          if (messageId === message.id) {
            if (message.labels.includes(label)) {
            } else {
              let labelArray = message.labels;
              labelArray.push(label);
              let newLabels = labelArray.join(',');
              updateMessage(messageId, {
                labels: newLabels
              }).then(updatedMessage => {
                this.props.store.dispatch({
                  type: 'UPDATE_MESSAGE',
                  message: updatedMessage
                });
              });
            }
          }
        });
      })
    );
  };

  _removeLabelSelectedMessages = label => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId => {
        this.state.messages.forEach(message => {
          if (messageId === message.id) {
            if (message.labels.includes(label)) {
              let labelArray = message.labels;
              labelArray.splice(labelArray.indexOf(label), 1);
              let newLabels = labelArray.join(',');
              updateMessage(message.id, {
                labels: newLabels
              }).then(updatedMessage => {
                this.props.store.dispatch({
                  type: 'UPDATE_MESSAGE',
                  message: updatedMessage
                });
              });
            }
          }
        });
      })
    );
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
      this.props.store.dispatch({
        type: 'CREATE_MESSAGE',
        message: createdMsg,
        showComposeForm: false
      });
    });
  };
  _cancel = () => {
    this.props.store.dispatch({
      type: 'CANCEL',
      showComposeForm: false
    });
  };

  _openComposeForm = () => {
    this.props.store.dispatch({
      type: 'OPEN_COMPOSE_FORM',
      showComposeForm: true
    });
  };

  _selectAllMessages = () => {
    this.props.store.dispatch({
      type: 'SELECT_ALL_MESSAGES'
    });
  };

  _deselectAllMessages = () => {
    this.props.store.dispatch({
      type: 'DESELECT_ALL_MESSAGES'
    });
  };

  _markAsReadSelectedMessages = () => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId =>
        this._markAsReadMessage(messageId)
      )
    );
  };

  _markAsUnreadSelectedMessages = () => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId => {
        updateMessage(messageId, { read: false }).then(updatedMessage => {
          this.props.store.dispatch({
            type: 'UPDATE_MESSAGE',
            messsage: updatedMessage
          });
        });
      })
    );
  };

  _deleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      this.state.messages.forEach(message => {
        if (messageId === message.id) {
          deleteMessage(messageId).then(wasDeleted => {
            this.props.store.dispatch({
              type: 'DELETE_MESSAGE',
              messageId: message.id
            });
          });
        }
      });
    });
  };
}
