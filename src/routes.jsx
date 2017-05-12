import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/Home';

function createRoutes(store) {
  return [
    <Route key="home" exact strict path="/" component={Home(store)}/>,
  ];
}

export default createRoutes;
