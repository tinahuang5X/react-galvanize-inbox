import getMessages from '../../api/getMessages';

export default function getMessagesProcess() {
  return (dispatch, getState) => {
    return getMessages().then(records => {
      dispatch({ type: 'SET_MESSAGES', messages: records });
      return records;
    });
  };
}
