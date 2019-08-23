// Dependencies
import express from 'express';

// Config
import { $api } from '../../../../config';

// Utils
import { apiFetch } from '../../../shared/utils/api';

// Express Router
const Router = express.Router();

// POST Methods
Router.post('/uui/something', (req, res) => {
  const userToken = res.session('userToken');

  const options = {
    method: 'POST',
    body: {
      ...req.body,
    },
    headers: {
      accessToken: userToken.access_token,
    },
  };

  apiFetch(`${$api().externalApi}/something`, options, false, true).then(
    response => res.json(response),
  );
});

Router.put('/uui/me/preferences', (req, res) => {
  const userToken = res.session('userToken');
  const options = {
    method: 'PUT',
    body: {
      ...req.body,
    },
    headers: {
      accessToken: userToken.access_token,
    },
  };
  apiFetch(`${$api().externalApi}/me/preferences`, options, false, true).then(
    response => res.json(response),
  );
});


Router.post('/uui/something/item', (req, res, next) => {
  const userToken = res.session('userToken');
  const { body } = req;

  apiFetch(
    `${$api().externalApi}/something/item`,
    {
      method: 'POST',
      headers: {
        accessToken: userToken.access_token,
      },
      body,
    },
    false,
    true,
    next,
  ).then(response => res.json(response));
});

// GET Methods
Router.get('/uui/me', (req, res) => {
  const userToken = res.session('userToken');

  apiFetch(
    `${$api().externalApi}/me`,
    {
      headers: {
        accessToken: userToken.access_token,
      },
    },
    false,
    true,
  ).then(response => res.json(response));
});

Router.get('/uui/something/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const userToken = res.session('userToken');

  apiFetch(
    `${$api().externalApi}/something/${id}`,
    {
      headers: {
        accessToken: userToken.access_token,
      },
    },
    false,
    true,
  ).then(response => res.json(response));
});

Router.get('/uui/something/:id', (req, res, next) => {
  const userToken = res.session('userToken');
  const {
    params: { id },
  } = req;

  apiFetch(
    `${$api().externalApi}/something/${id}`,
    {
      headers: {
        accessToken: userToken.access_token,
      },
    },
    false,
    true,
    next,
  ).then(response => res.json(response));
});

// PUT Methods
Router.put('/uui/something/item/:somethingItemId', (req, res, next) => {
  const userToken = res.session('userToken');
  const {
    params: { somethingItemId },
    body,
  } = req;

  apiFetch(
    `${$api().externalApi}/something/item/${somethingItemId}`,
    {
      method: 'PUT',
      headers: {
        accessToken: userToken.access_token,
      },
      body,
    },
    false,
    true,
    next,
  ).then(response => res.json(response));
});


export default Router;
