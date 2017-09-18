import updateMessage from '../../api/updateMessage';

export default function updateMessageProcess(messageId, change) {
  return (dispatch, getState) => {
    return updateMessage(messageId, change).then(updatedMessage => {
      dispatch({ type: 'UPDATE_MESSAGE', message: updatedMessage });
      return updatedMessage;
    });
  };
}
