// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Page404 from '@Error/404';
import Component from '../index';

const server = [
  { component: Component, exact: false, path: '/:page' },
  { component: Component, exact: true, path: '/' },
];

const client = (
  <Switch>
    {server.map(serverProps => (
      <Route key={serverProps.path} {...serverProps} />
    ))}
    <Route component={Page404} />
  </Switch>
);

export default {
  server,
  client,
};
