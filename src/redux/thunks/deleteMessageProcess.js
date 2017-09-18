import deleteMessage from '../../api/deleteMessage';

export default function deleteMessageProcess(messageId) {
  return (dispatch, getState) => {
    return deleteMessage(messageId).then(wasDeleted => {
      dispatch({ type: 'DELETE_MESSAGE', messageId: messageId });
      return wasDeleted;
    });
  };
}
