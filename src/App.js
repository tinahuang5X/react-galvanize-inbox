import React, { Component } from 'react';
//import logo from './logo.svg';
// import env from './env';
import { Provider } from 'react-redux';
import './App.css';
// import InboxPage from './components/InboxPage';
import setupStore from './redux/setupStore';

import InboxPageContainer from './redux/containers/InboxPageContainer';

// import getMessagesProcess from './redux/thunks/getMessagesProcess';
// import updateMessageProcess from './redux/thunks/updateMessageProcess';
// import deleteMessageProcess from './redux/thunks/deleteMessageProcess';
// import createMessageProcess from './redux/thunks/createMessageProcess';

const store = setupStore();
//app = new App({});
//element = app.render()
//putItIntoDom(element);
//app.componentDidMount();

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <InboxPageContainer />
        </Provider>
      </div>
    );
  }
}
