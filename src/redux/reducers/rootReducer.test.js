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
      {
        id: 'rec6gLtK0DZ5DQOzT',
        body: 'Thanks for your pickup order!',
        subject: 'The Home Depot',
        read: true,
        labels: ['sales']
      },
      {
        id: 'recWEQJdg0pIL02XH',
        body: "I can't wait to see you again!",
        subject: 'Emma sent you a message',
        read: true,
        labels: ['personal']
      },
      {
        id: 'recZnyyubV36PdZbO',
        body:
          'Fall will be here sooner than you think, and we can’t wait to see you in Berkeley. Online registration ends October 6, so register today for a weekend packed full of more than 100 special events, lectures, tours, and parties.',
        subject: 'The Cal family comes together in October!',
        labels: ['personal']
      },
      {
        id: 'recaLQcFGLzH7MxHY',
        body:
          'Not a ton of people responded about coming tomorrow, so I am cancelling class. We all work really hard, so time to kick back and relax! Back to it on Tuesday!',
        subject: 'No Class Labor Day',
        read: true,
        labels: ['gschool']
      },
      {
        id: 'recabBnm3tHcgvDom',
        body: 'Where Happiness is Found',
        subject: 'Devotionals Daily',
        read: true,
        labels: ['personal']
      },
      {
        id: 'rechRQa3nkrZW2Whl',
        body: "Let's go shopping!",
        subject: 'Today is a beautiful day',
        labels: ['sales']
      },
      {
        id: 'rechbFCOUCSksDHeD',
        body:
          'We combed our catalog and found courses and Specializations that we think match your interests. Browse our recommendations below, and start learning something new today!',
        subject: 'Recommended courses for you from Coursera',
        labels: ['new']
      },
      {
        id: 'recscVNsC1AtKCUdP',
        body:
          "Sandwiches are a pretty simple combo of five main ingredients: meat, cheese, veggies, spreads, and bread. So how can something so simple be so darn delicious? We think the power lies in the simplicity itself, so we’ve put together a list of places that have a sandwich game so strong, 'simple' will be your new best friend.",
        subject: 'Sandwiches: The Best Thing In Sliced Bread',
        labels: ['sales']
      },
      {
        id: 'recwTvML8WlkOPqlO',
        body:
          'We are excited to announce that the fitness floor renovation is on schedule and we are looking forward to opening on Sept 5th at 6:30am. If you would like an orientation with a trainer on the new equipment, there are 2 ways that this can be achieved. Please note , orientations are not mandatory but a service we are providing to pass holders to help ease the transition into the new equipment.',
        subject: 'New Fitness Equipment Orientation Information',
        labels: ['gschool']
      }
    ],
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
