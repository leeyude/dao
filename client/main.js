import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
// import DaoRoutes from './../lib/routing/routes';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Routes from './../imports/routes';

const publicPages = ['/', '/login', '/signup'];
const privatePages = ['/admin'];


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const history = createHistory();
  const location = history.location.pathname;
  const isPublicPage = publicPages.includes(location);
  const isPrivatePage = privatePages.includes(location);

  if(isPublicPage && isAuthenticated){
    history.replace('/admin');
  }else if(isPrivatePage && !isAuthenticated){
    history.replace('/');
  };
});

Meteor.startup(() => {
  ReactDOM.render(<Routes/>, document.getElementById('dao'));
});
