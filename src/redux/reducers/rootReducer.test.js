import rootReducer from './rootReducer';

import data from '../../mock-data';

test('SET_MESSAGES', () => {
  let currentState;
  currentState = rootReducer(
    {
      messages: [],
      selectedMessageIds: [],
      showComposeForm: false,
      showApiError: false
    },
    {
      type: 'SET_MESSAGES',
      messages: [...data.messages]
    }
  );
  expect(currentState).toEqual({
    messages: [...data.messages],
    selectedMessageIds: [],
    showComposeForm: false,
    showApiError: false
  });
});

test('UPDATE_MESSAGE', () => {
  let currentState;
  currentState = rootReducer(
    {
      messages: [...data.messages],
      selectedMessageIds: [],
      showComposeForm: false,
      showApiError: false
    },
    {
      type: 'UPDATE_MESSAGE',
      message: {
        id: 'recWEQJdg0pIL02XH',
        body: "I can't wait to see you again!",
        subject: 'Emma sent you a message',
        read: true,
        labels: ['personal']
      }
    }
  );
  expect(currentState).toEqual({
    messages: [
      data.messages[0],
      {
        id: 'recWEQJdg0pIL02XH',
        body: "I can't wait to see you again!",
        subject: 'Emma sent you a message',
        read: true,
        labels: ['personal']
      }
    ].concat(data.messages.slice(2)),

    selectedMessageIds: [],
    showComposeForm: false,
    showApiError: false
  });
});

test('OPEN_COMPOSE_FORM', () => {
  let currentState;
  currentState = rootReducer(
    {
      messages: [...data.messages],
      selectedMessageIds: [],
      showComposeForm: false,
      showApiError: false
    },
    { type: 'OPEN_COMPOSE_FORM' }
  );
  expect(currentState).toEqual({
    messages: [...data.messages],
    selectedMessageIds: [],
    showComposeForm: true,
    showApiError: false
  });
});

test('CREATE_MESSAGE', () => {
  let currentState;
  currentState = rootReducer(
    {
      messages: [...data.messages],
      selectedMessageIds: [],
      showComposeForm: true,
      showApiError: false
    },
    {
      type: 'CREATE_MESSAGE',
      message: {
        id: 'rec7R8XrVnARvyvFT',
        body: 'How are you?',
        subject: 'Hi',
        labels: ['new']
      },
      showComposeForm: false
    }
  );
  expect(currentState).toEqual({
    messages: [
      {
        id: 'rec7R8XrVnARvyvFT',
        body: 'How are you?',
        subject: 'Hi',
        labels: ['new']
      },
      ...data.messages
    ],
    selectedMessageIds: [],
    showComposeForm: false,
    showApiError: false
  });
});
test('SELECT_MESSAGE', () => {
  let currentState;
  currentState = rootReducer(
    {
      messages: [...data.messages],
      selectedMessageIds: [],
      showComposeForm: false,
      showApiError: false
    },
    { type: 'SELECT_MESSAGE', messageId: 'recaLQcFGLzH7MxHY' }
  );
  expect(currentState).toEqual({
    messages: [...data.messages],
    selectedMessageIds: ['recaLQcFGLzH7MxHY'],
    showComposeForm: false,
    showApiError: false
  });
});

test('DELETE_MESSAGE', () => {
  let currentState;
  currentState = rootReducer(
    {
      messages: [...data.messages],
      selectedMessageIds: ['recscVNsC1AtKCUdP'],
      showComposeForm: false,
      showApiError: false
    },
    { type: 'DELETE_MESSAGE', messageId: 'recscVNsC1AtKCUdP' }
  );
  expect(currentState).toEqual({
    messages: data.messages.filter(
      message => message.id !== 'recscVNsC1AtKCUdP'
    ),
    selectedMessageIds: ['recscVNsC1AtKCUdP'],
    showComposeForm: false,
    showApiError: false,
    selectedMessageId: null
  });
});
