import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/models/AddRoomModal';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <AppProvider>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={ChatRoom} path="/" />
          </Switch>

          <AddRoomModal />
        </AppProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
