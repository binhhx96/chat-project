import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/AuthProvider';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={ChatRoom} path="/" />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
