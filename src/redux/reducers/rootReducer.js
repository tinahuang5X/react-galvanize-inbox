export default function rootReducer(
  currentState = {
    messages: [],
    selectedMessageIds: [],
    showComposeForm: false,
    showApiError: false
  },
  action
) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...currentState, messages: action.messages };
    case 'SELECT_MESSAGE':
      return { ...currentState, selectedMessageIds: action.messageId };
    case 'DESELECT_MESSAGE':
      return { ...currentState, selectedMessageIds: null };
    case 'UPDATE_MESSAGE':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };

    case 'SELECT_ALL_MESSAGES':
      return {
        ...currentState,
        selectedMessageIds: currentState.messages.map(message => message.id)
      };

    case 'DESELECT_ALL_MESSAGES':
      return { ...currentState, selectedMessageIds: [] };

    case 'CREATE_MESSAGE':
      return {
        ...currentState,
        selectedMessageId: action.message.id,
        messages: [action.message, ...currentState.messages]
      };
    case 'DELETE_MESSAGE':
      return {
        ...currentState,
        selectedMessageId: null,
        notes: currentState.messages.filter(
          message => message.id !== action.messageId
        )
      };
    case 'OPEN_COMPOSE_FORM':
      return {
        ...currentState,
        showComposeForm: action.showComposeForm
      };
    case 'CANCEL':
      return {
        ...currentState,
        showComposeForm: action.showComposeForm
      };
    case 'COMPOSE_FORM_SUBMIT':
      return {
        ...currentState,
        showComposeForm: action.showComposeForm,
        messages: [action.message, ...currentState.messages]
      };

    default:
      return currentState;
  }
}
