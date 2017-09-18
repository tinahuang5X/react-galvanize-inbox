import createMessage from '../../api/createMessage';

export default function createMessageProcess(newMessage) {
  return (dispatch, getState) => {
    return createMessage(newMessage).then(createdMessage => {
      dispatch({
        type: 'CREATE_MESSAGE',
        shouldShowComposeForm: false,
        message: createdMessage
      });
      return createdMessage;
    });
  };
}
