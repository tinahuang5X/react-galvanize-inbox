import createMessage from '../../api/createMessage';

export default function createMessageProcess(composedMessage) {
  return (dispatch, getState) => {
    return createMessage(composedMessage).then(createdMessage => {
      dispatch({
        type: 'CREATE_MESSAGE',
        shouldShowComposeForm: false,
        message: createdMessage
      });
      return createdMessage;
    });
  };
}
