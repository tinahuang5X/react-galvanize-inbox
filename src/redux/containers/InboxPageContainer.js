import { compose, lifecycle } from 'recompose';

import { connect } from 'react-redux';

import InboxPage from '../../components/InboxPage';

import getMessagesProcess from '../thunks/getMessagesProcess';

import updateMessageProcess from '../thunks/updateMessageProcess';

import createMessageProcess from '../thunks/createMessageProcess';

import deleteMessageProcess from '../thunks/deleteMessageProcess';

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,

    selectedMessageIds: state.selectedMessageIds,

    showComposeForm: state.showComposeForm
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(getMessagesProcess()),
    onMarkAsReadMessage: messageId =>
      dispatch(updateMessageProcess(messageId, { read: true })),

    onSelectMessage: messageId =>
      dispatch({ type: 'SELECT_MESSAGE', messageId }),

    onDeselectMessage: messageId =>
      dispatch({ type: 'DESELECT_MESSAGE', messageId }),

    onStarMessage: messageId =>
      dispatch(updateMessageProcess(messageId, { starred: true })),

    onUnstarMessage: messageId =>
      dispatch(updateMessageProcess(messageId, { starred: false })),

    onApplyLabelSelectedMessages: (label, selectedMessageIds, messages) => {
      selectedMessageIds.forEach(messageId => {
        messages.forEach(message => {
          if (messageId === message.id) {
            if (!message.labels.includes(label)) {
              let labelArray = message.labels;
              labelArray.push(label);
              let newLabels = labelArray.join(',');
              dispatch(updateMessageProcess(messageId, { labels: newLabels }));
            }
          }
        });
      });
    },

    onRemoveLabelSelectedMessages: (label, selectedMessageIds, messages) => {
      selectedMessageIds.forEach(messageId => {
        messages.forEach(message => {
          if (messageId === message.id) {
            if (message.labels.includes(label)) {
              let labelArray = message.labels;
              labelArray.splice(labelArray.indexOf(label), 1);
              let newLabels = labelArray.join(',');

              dispatch(updateMessageProcess(messageId, { labels: newLabels }));
            }
          }
        });
      });
    },

    onSubmit: (subject, body) => {
      let newMessage = {
        subject: subject,
        read: false,
        starred: false,
        labels: ['new'],
        body: body
      };

      dispatch(createMessageProcess(newMessage));
    },

    onCancel: () =>
      dispatch({
        type: 'CANCEL',
        showComposeForm: false
      }),

    onOpenComposeForm: () =>
      dispatch({
        type: 'OPEN_COMPOSE_FORM'
      }),

    onSelectAllMessages: () =>
      dispatch({
        type: 'SELECT_ALL_MESSAGES'
      }),

    onDeselectAllMessages: () =>
      dispatch({
        type: 'DESELECT_ALL_MESSAGES'
      }),

    onMarkAsReadSelectedMessages: selectedMessageIds => {
      selectedMessageIds.forEach(messageId =>
        dispatch(updateMessageProcess(messageId, { read: true }))
      );
    },

    onMarkAsUnreadSelectedMessages: selectedMessageIds => {
      selectedMessageIds.forEach(messageId =>
        dispatch(updateMessageProcess(messageId, { read: false }))
      );
    },

    onDeleteSelectedMessages: selectedMessageIds => {
      selectedMessageIds.forEach(messageId => {
        dispatch(deleteMessageProcess(messageId));
      });
    }
    // onSelect: noteId => dispatch({ type: 'SELECT_NOTE', noteId }),
    //
    // onSave: ({ id, ...changes }) =>
    //   id
    //     ? dispatch(updateNoteProcess(id, changes))
    //     : dispatch(createNoteProcess(changes)),
    //
    // onDelete: ({ id }) => dispatch(deleteNoteProcess(id)),
    //
    // onDeselectNote: () => dispatch({ type: 'DESELECT_NOTE' })
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }
});

export default compose(connectToStore, onDidMount)(InboxPage);
